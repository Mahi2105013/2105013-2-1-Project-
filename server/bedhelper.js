const morgan = require('morgan');
const express = require('express');
const router = require('express-promise-router')();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
const cors = require('cors');
let connection = undefined;
async function db_query(query,params){
    if( connection === undefined ){
        connection = await oracledb.getConnection({
            //user:'c##tamim',
            //password:'password',
            user: 'hr',
            password: 'hr',
            //connectionString:'localhost/orcl'
            connectString: 'localhost:1521/ORCL'
        });
    }
    try{
        //let result = await connection.execute(query,params);
        let result = await connection.execute(query, params, { autoCommit: true });
        return result.rows;
    }catch (error){
        console.log(error);
    }
}

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

// get all rooms
app.get("/rooms", async(req, res) => {
    try {
    const query = `SELECT r.ROOM_ID as ID, r.ROOM_NAME AS NAME, 
    r.ROOM_TYPE AS TYPE, COUNT(b.BED_ID) AS CAPACITY FROM ROOM r 
    LEFT JOIN BED b ON r.ROOM_ID = b.ROOM_ID GROUP BY r.ROOM_ID, 
    r.ROOM_NAME, r.ROOM_TYPE ORDER BY R.ROOM_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// GET ALL unoccupied/ available BEDS
app.get("/beds", async(req, res) => {
    try {
    const query = `select b.bed_id as BID, b.bed_number BNUM, b.cost_per_night BCOST, 
    r.room_id RID, r.room_name RNAME, r.room_type RTYPE from bed b join room r on 
    b.room_id = r.room_id 
    WHERE B.BED_ID NOT IN
    (SELECT BED_ID FROM BED_TAKEN
    WHERE END_DATE IS NULL)
    order by b.bed_id`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// delete a room
app.delete("/rooms/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM ROOM WHERE ROOM_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete a bed
app.delete("/beds/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM BED WHERE BED_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all beds taken
app.get("/bedstaken", async(req, res) => {
    try {
    const query = 
    `SELECT BT.BED_TAKEN_ID, 
    A.ADMISSION_ID,
    (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    P.DISEASE,
    B.BED_ID,
    B.BED_NUMBER,
    R.ROOM_NAME,
    R.ROOM_TYPE,
    TO_CHAR(BT.START_DATE, 'DD/MM/YYYY') S, 
    TO_CHAR(BT.END_DATE, 'DD/MM/YYYY') E, 
    BT.COST_PER_NIGHT,
    BT.NUMBER_OF_NIGHTS_STAYED
    FROM BED_TAKEN BT
    LEFT OUTER JOIN BED B
    ON BT.BED_ID = B.BED_ID
    LEFT OUTER JOIN ROOM R
    ON B.ROOM_ID = R.ROOM_ID
    LEFT OUTER JOIN ADMISSION A
    ON BT.ADMISSION_ID = A.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P 
    ON A.PATIENT_ID = P.PATIENT_ID
    ORDER BY BED_TAKEN_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// all beds currently occupied
app.get("/bedstakenocc", async(req, res) => {
    try {
    const query = 
    `SELECT BT.BED_TAKEN_ID, 
    A.ADMISSION_ID,
    (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    P.DISEASE,
    B.BED_ID,
    B.BED_NUMBER,
    R.ROOM_NAME,
    R.ROOM_TYPE,
    TO_CHAR(BT.START_DATE, 'DD-MON-YYYY') S, 
    BT.COST_PER_NIGHT,
    BT.NUMBER_OF_NIGHTS_STAYED
    FROM BED_TAKEN BT
    LEFT OUTER JOIN BED B
    ON BT.BED_ID = B.BED_ID
    LEFT OUTER JOIN ROOM R
    ON B.ROOM_ID = R.ROOM_ID
    LEFT OUTER JOIN ADMISSION A
    ON BT.ADMISSION_ID = A.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P 
    ON A.PATIENT_ID = P.PATIENT_ID
    WHERE BT.END_DATE IS NULL
    ORDER BY BED_TAKEN_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// beds occupied on given date
app.get("/bedstakenoccday", async(req, res) => {
    try {
    const {GivenDate} = req.query;
    const query = 
    `SELECT BT.BED_TAKEN_ID, 
    A.ADMISSION_ID,
    (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    P.DISEASE,
    B.BED_ID,
    B.BED_NUMBER,
    R.ROOM_NAME,
    R.ROOM_TYPE,
    TO_CHAR(BT.START_DATE, 'DD-MON-YYYY') S, 
    BT.COST_PER_NIGHT,
    --BT.NUMBER_OF_NIGHTS_STAYED
    ROUND(TO_DATE(:GivenDate, 'YYYY-MM-DD') - BT.START_DATE,0) as NUMBER_OF_NIGHTS_STAYED
    FROM BED_TAKEN BT
    LEFT OUTER JOIN BED B
    ON BT.BED_ID = B.BED_ID
    LEFT OUTER JOIN ROOM R
    ON B.ROOM_ID = R.ROOM_ID
    LEFT OUTER JOIN ADMISSION A
    ON BT.ADMISSION_ID = A.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P 
    ON A.PATIENT_ID = P.PATIENT_ID
    WHERE TO_DATE(:GivenDate, 'YYYY-MM-DD') BETWEEN BT.START_DATE AND BT.END_DATE
    ORDER BY BED_TAKEN_ID`;
    const params = {
        GivenDate : `${GivenDate}`
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// searching patient in occupied bed
// all beds currently occupied
app.get("/bedstakenoccsearch", async(req, res) => {
    try {
    const {name} = req.query;
    const query = 
    `SELECT BT.BED_TAKEN_ID, 
    A.ADMISSION_ID,
    (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    P.DISEASE,
    B.BED_ID,
    B.BED_NUMBER,
    R.ROOM_NAME,
    R.ROOM_TYPE,
    TO_CHAR(BT.START_DATE, 'DD-MON-YYYY') S, 
    BT.COST_PER_NIGHT,
    BT.NUMBER_OF_NIGHTS_STAYED
    FROM BED_TAKEN BT
    LEFT OUTER JOIN BED B
    ON BT.BED_ID = B.BED_ID
    LEFT OUTER JOIN ROOM R
    ON B.ROOM_ID = R.ROOM_ID
    LEFT OUTER JOIN ADMISSION A
    ON BT.ADMISSION_ID = A.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P 
    ON A.PATIENT_ID = P.PATIENT_ID
    WHERE BT.END_DATE IS NULL 
    AND LOWER(P.FIRST_NAME || ' ' || P.LAST_NAME) LIKE LOWER('%' || :name || '%')
    ORDER BY BED_TAKEN_ID`;
    const params = {
        name : `${name}`
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// Discharge a patient
app.put("/bedstakendischarge/:bedtakenid", async (req, res) => {
    try {
        const { bedtakenid } = req.params;
        console.log("BED ID FROM BACKEND: " + bedtakenid);
        // Update ADMISSION table
        const query2 = "UPDATE ADMISSION SET DISCHARGE_DATE = SYSDATE WHERE ADMISSION_ID = :bedtakenid";
        const params2 = [bedtakenid];
        const updateResult2 = await db_query(query2, params2);
        
        // Update BED_TAKEN table
        const query1 = "UPDATE BED_TAKEN SET END_DATE = SYSDATE WHERE ADMISSION_ID = :bedtakenid";
        const params1 = [bedtakenid];
        const updateResult1 = await db_query(query1, params1);

        res.json({ message: "Patient discharged successfully" });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Failed to discharge patient" });
    }
});

// const response1 = await fetch(`http://localhost:5000/changebed/${bedtakenid}`
// change bed (part 1 - discard old)
app.put("/changebed/:bedtakenid", async (req, res) => {
    try {
        const { bedtakenid } = req.params;
        console.log("BED ID FROM BACKEND: " + bedtakenid);

        // Update BED_TAKEN table
        const query1 = "UPDATE BED_TAKEN SET END_DATE = SYSDATE WHERE BED_TAKEN_ID = :bedtakenid";
        const params1 = [bedtakenid];
        const updateResult1 = await db_query(query1, params1);
        res.json({ message: "Patient old bed discarded" });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Failed to discharge patient" });
    }
});

// change bed (part 2 - allocate new)
app.post("/bedtaken", async(req, res) => {
    try {
        const {bedId, bedtakenid} = req.body;

        const query = 
        `INSERT INTO BED_TAKEN (BED_ID, START_DATE, COST_PER_NIGHT, ADMISSION_ID)
        VALUES (:1, SYSDATE, 
        (SELECT COST_PER_NIGHT FROM BED B WHERE B.BED_ID = :2),
        (SELECT ADMISSION_ID FROM BED_TAKEN WHERE BED_TAKEN_ID = :3)
        )
        `;
        const params = [bedId, bedId, bedtakenid];
    
        //await db_query(query, params);
        const result = await db_query(query, params);
        //res.json({message : "done!"});
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// discharge verifier
app.get("/dischargeverifier", async(req, res) => {
    try {
    const {bedtakenid} = req.query;
    const query = `SELECT *
    FROM BED_TAKEN WHERE
    END_DATE IS NULL
    AND BED_TAKEN_ID = :bedtakenid`;
    const params = [bedtakenid];
    console.log("bed taken id: " + bedtakenid)
    const result = await db_query(query,params);
    console.log(result)
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});
   
// BED_ALLOCATION VERIFIER
app.get("/allocateverifier", async(req, res) => {
    try {
    const {newBedId} = req.query;
    const query = `SELECT * FROM BED_TAKEN
    WHERE BED_ID = :newBedId
    AND END_DATE IS NULL`;
    // IF THIS RETURNS A ROW THEN BED IS OCCUPIED
    const params = [newBedId];
    console.log("bed id: " + newBedId)
    const result = await db_query(query,params);
    console.log(result)
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// bed taken id is for occupied beds verifier
app.get("/bedtakenoccupiedbeds", async(req, res) => {
    try {
    const {bedtakenid} = req.query;
    const query = `SELECT BED_TAKEN_ID
    FROM BED_TAKEN
    WHERE END_DATE IS NULL
    AND BED_TAKEN_ID = :bedtakenid
    ORDER BY BED_TAKEN_ID`;
    // -- if this returns nothing then bed taken
    //-- id provided was incorrect
    const params = [bedtakenid];
    console.log("bed taken id: " + bedtakenid)
    const result = await db_query(query,params);
    console.log(result)
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

module.exports = app;