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

// insert medicine
app.post("/medicines", async(req, res) => {
    try {
        const {TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE } = req.body;

        const query = "INSERT INTO MEDICINE (TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE ) VALUES (:1, :2, :3, :4, :5, :6)"; // RETURNING *";
        const params = [TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE];

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

// delete medicine
app.delete("/medicines/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM MEDICINE WHERE MEDICINE_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all medicines
app.get("/medicines", async(req, res) => {
    try {
    const query = "select * from MEDICINE";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get a MEDICINE
app.get("/medicines/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = "SELECT * FROM MEDICINE where MEDICINE_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// GET MEDICINE TAKEN HISTORY - FOUR PARTS
app.get("/medicinestaken", async(req, res) => {
    try {
    const query = `SELECT (P.FIRST_NAME || ' ' || P.LAST_NAME) AS PATIENT_NAME, 
    A.ADMISSION_ID, M1.MEDICINE_ID, 
    (M1.TRADE_NAME || ' (' || M1.GENERIC_NAME || ' ' || M1.STRENGTH || ')') MEDICINE_NAME,  
    M1.MANUFACTURER, M2.UNIT_COST, M2.QUANTITY, (M2.UNIT_COST*M2.QUANTITY) AS TOTAL_COST 
    FROM MEDICINE M1 JOIN MEDICINE_TAKEN M2 ON (M1.MEDICINE_ID = M2.MEDICINE_ID) 
    JOIN ADMISSION A ON (A.ADMISSION_ID = M2.ADMISSION_ID) JOIN PATIENT P 
    ON (P.PATIENT_ID = A.PATIENT_ID) where A.ADMISSION_ID < 301 order by P.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

app.get("/medicinestaken2", async(req, res) => {
    try {
    const query = `SELECT M2.MEDICINE_TAKEN_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME) AS PATIENT_NAME, 
    A.ADMISSION_ID, M1.MEDICINE_ID, 
    (M1.TRADE_NAME || ' (' || M1.GENERIC_NAME || ' ' || M1.STRENGTH || ')') MEDICINE_NAME,  
    M1.MANUFACTURER, M2.UNIT_COST, M2.QUANTITY, (M2.UNIT_COST*M2.QUANTITY) AS TOTAL_COST 
    FROM MEDICINE M1 JOIN MEDICINE_TAKEN M2 ON (M1.MEDICINE_ID = M2.MEDICINE_ID) JOIN 
    ADMISSION A ON (A.ADMISSION_ID = M2.ADMISSION_ID) JOIN PATIENT P ON 
    (P.PATIENT_ID = A.PATIENT_ID) where A.ADMISSION_ID BETWEEN 1 AND 320 order 
    by P.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

app.get("/medicinestaken3", async(req, res) => {
    try {
    const query = `SELECT M2.MEDICINE_TAKEN_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME) AS PATIENT_NAME, 
    A.ADMISSION_ID, M1.MEDICINE_ID, 
    (M1.TRADE_NAME || ' (' || M1.GENERIC_NAME || ' ' || M1.STRENGTH || ')') MEDICINE_NAME,  
    M1.MANUFACTURER, M2.UNIT_COST, M2.QUANTITY, (M2.UNIT_COST*M2.QUANTITY) AS TOTAL_COST FROM 
    MEDICINE M1 JOIN MEDICINE_TAKEN M2 ON (M1.MEDICINE_ID = M2.MEDICINE_ID) JOIN ADMISSION A 
    ON (A.ADMISSION_ID = M2.ADMISSION_ID) JOIN PATIENT P ON (P.PATIENT_ID = A.PATIENT_ID) 
    where A.ADMISSION_ID BETWEEN 321 AND 640 order by P.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


app.get("/medicinestaken4", async(req, res) => {
    try {
    const query = `SELECT M2.MEDICINE_TAKEN_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME) AS PATIENT_NAME, 
    A.ADMISSION_ID, M1.MEDICINE_ID, (M1.TRADE_NAME || ' (' || M1.GENERIC_NAME || ' ' 
    || M1.STRENGTH || ')') MEDICINE_NAME,  M1.MANUFACTURER, M2.UNIT_COST, M2.QUANTITY, 
    (M2.UNIT_COST*M2.QUANTITY) AS TOTAL_COST FROM MEDICINE M1 JOIN MEDICINE_TAKEN M2 ON 
    (M1.MEDICINE_ID = M2.MEDICINE_ID) JOIN ADMISSION A ON (A.ADMISSION_ID = M2.ADMISSION_ID) 
    JOIN PATIENT P ON (P.PATIENT_ID = A.PATIENT_ID) where A.ADMISSION_ID > 640 order by 
    P.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// TOTAL MEDICINE_TAKEN ROWS
app.get("/medicinestakencount", async(req, res) => {
    try {
    const query = `SELECT COUNT(*) AS TOTALLL FROM MEDICINE M1 JOIN MEDICINE_TAKEN M2 
    ON (M1.MEDICINE_ID = M2.MEDICINE_ID) JOIN ADMISSION A ON A.ADMISSION_ID = M2.ADMISSION_ID 
    JOIN PATIENT P ON P.PATIENT_ID = A.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TOTAL INCOME FROM MEDICINE BILL
app.get("/medicinestakenbill", async(req, res) => {
    try {
    const query = `SELECT SUM(M2.UNIT_COST*M2.QUANTITY) AS TOTAL FROM MEDICINE M1 
    JOIN MEDICINE_TAKEN M2 ON (M1.MEDICINE_ID = M2.MEDICINE_ID) JOIN ADMISSION A ON 
    A.ADMISSION_ID = M2.ADMISSION_ID JOIN PATIENT P ON P.PATIENT_ID = A.PATIENT_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TOP SELLING DRUGS (YEARLY)
app.get("/topmedsyearly", async(req, res) => {
    const { year } = req.query;
    try {
    const query = `SELECT * FROM( SELECT M.MEDICINE_ID MEDID, 
    (M.TRADE_NAME || ' [' || (M.GENERIC_NAME || ' (' || M.STRENGTH ||')') || ']') 
    NEM, SUM(MT.QUANTITY) Q, SUM(MT.UNIT_COST*MT.QUANTITY) REVENUE FROM MEDICINE_TAKEN 
    MT JOIN MEDICINE M ON M.MEDICINE_ID = MT.MEDICINE_ID WHERE TO_CHAR(MT.TAKEN_DATE, 'YYYY') 
    = TO_CHAR(:year) GROUP BY M.MEDICINE_ID, M.TRADE_NAME, (M.GENERIC_NAME || ' (' || M.STRENGTH || ')') 
    ORDER BY SUM(MT.UNIT_COST*MT.QUANTITY) DESC) WHERE ROWNUM <= 10`;
    const params = {
        year: `${year}`
   };
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


app.get("/topmedsByMonth", async (req, res) => {
    try {
        const { month, year } = req.query; // Assuming month and year are sent as query parameters
        const query = `
            SELECT * 
            FROM (
                SELECT 
                    M.MEDICINE_ID MEDID, 
                    (M.TRADE_NAME || ' [' || (M.GENERIC_NAME || ' (' || M.STRENGTH ||')') || ']') NEM, 
                    SUM(MT.QUANTITY) Q, 
                    SUM(MT.UNIT_COST*MT.QUANTITY) REVENUE 
                FROM 
                    MEDICINE_TAKEN MT 
                    JOIN MEDICINE M ON M.MEDICINE_ID = MT.MEDICINE_ID 
                WHERE  
                    TO_NUMBER(TO_CHAR(MT.TAKEN_DATE, 'MM')) = :month AND
                    TO_NUMBER(TO_CHAR(MT.TAKEN_DATE, 'YYYY')) = :year
                GROUP BY 
                    M.MEDICINE_ID, 
                    M.TRADE_NAME, 
                    (M.GENERIC_NAME || ' (' || M.STRENGTH || ')') 
                ORDER BY 
                    SUM(MT.UNIT_COST*MT.QUANTITY) DESC
            ) 
            WHERE 
                ROWNUM <= 10`;
        const params = {
            month : `${month}`, year: `${year}`
        };

        //const params = { name: `%${name}%`, name2: `%${name2}%`, description: `%${description}%`, manufacturer: `%${manufacturer}%`};
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// MEDICINE WISE ANALYSIS
app.get("/medicinewiseanalysis", async (req, res) => {
    try {
        //const { month, year } = req.query; // Assuming month and year are sent as query parameters
        const {startDate, endDate} = req.query;
        console.log(req.query)
        const query = `SELECT MEDICINE_ID,
        (M.TRADE_NAME || ' [' || (M.GENERIC_NAME || ' (' || M.STRENGTH ||')') || ']') NEM,
        DRUG_QUANTITIES_SOLD(MEDICINE_ID, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD')) DQ,
        DRUG_REVENUE(MEDICINE_ID, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD'))
        as DR 
        FROM MEDICINE M`;
        const params = {
            startDate : `${startDate}`, endDate: `${endDate}`            
        };
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

app.get("/medicinewiseanalysisday", async (req, res) => {
    try {
        //const { month, year } = req.query; // Assuming month and year are sent as query parameters
        const {GivenDate} = req.query;
        console.log(req.query)
        const query = `SELECT MT.MEDICINE_ID, 
        (M.TRADE_NAME || ' [' || M.GENERIC_NAME || ' (' || M.STRENGTH || ')]') MEDICINE_NAME,
        SUM(MT.QUANTITY) QUANTITIES_SOLD, SUM(MT.QUANTITY*MT.UNIT_COST) TOTAL_REV
        FROM MEDICINE_TAKEN MT
        JOIN MEDICINE M
        ON MT.MEDICINE_ID = M.MEDICINE_ID
        WHERE TRUNC(MT.TAKEN_DATE) = TO_DATE(:GivenDate, 'YYYY-MM-DD')
        GROUP BY MT.MEDICINE_ID, (M.TRADE_NAME || ' [' || M.GENERIC_NAME || ' (' || M.STRENGTH || ')]')
        ORDER BY MT.MEDICINE_ID`;
        const params = {
            GivenDate : `${GivenDate}`
        };
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});
// insert a medicine taken record
app.post("/medicinestaken", async(req, res) => {
    try {
        const { ADMISSION_ID, MEDICINE_ID, QUANTITY } = req.body;
        console.log("Yay!" + req.body)
        const query = `INSERT INTO MEDICINE_TAKEN (ADMISSION_ID, MEDICINE_ID, QUANTITY, TAKEN_DATE, UNIT_COST)
        VALUES (:1, :2, :3, SYSDATE,
        (SELECT PRICE FROM MEDICINE M WHERE M.MEDICINE_ID = :4))`; // RETURNING *";
        const params = [ADMISSION_ID, MEDICINE_ID, QUANTITY, MEDICINE_ID];
        const result = await db_query(query, params);
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = app;