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


// get all tests
app.get("/tests", async(req, res) => {
    try {
        const query = "SELECT * FROM TEST";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// get a test
app.get("/tests/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = "SELECT * FROM TEST where TEST_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// INSERTING TESTS
app.post("/tests", async(req, res) => {
    try {
        const {TYPE, DESCRIPTION, COST} = req.body;

        const query = "INSERT INTO TEST (TYPE, DESCRIPTION, COST) VALUES (:1, :2, :3)"; // RETURNING *";
        const params = [TYPE, DESCRIPTION, COST];

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

// DELETING TESTS
app.delete("/tests/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM TEST WHERE TEST_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






// get all tests TAKEN
app.get("/teststaken", async(req, res) => {
    try {
        const query = "SELECT * FROM TEST_TAKEN";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// get a test TAKEN
app.get("/teststaken/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = "SELECT * FROM TEST_TAKEN where TEST_TAKEN_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// INSERTING TESTS TAKEN
app.post("/teststaken", async(req, res) => {
    try {
        const {TAKEN_DATE, COST, ADMISSION_ID, TEST_ID} = req.body;

        const query = "INSERT INTO TEST_TAKEN (TAKEN_DATE, COST, ADMISSION_ID, TEST_ID) VALUES (:1, :2, :3, :4)"; // RETURNING *";
        const params = [TAKEN_DATE, COST, ADMISSION_ID, TEST_ID];

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

// DELETING TESTS TAKEN
app.delete("/teststaken/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM TEST_TAKEN WHERE TEST_TAKEN_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all teststaken
app.get("/teststakenlist", async(req, res) => {
    try {
    const query = `SELECT TT.TEST_TAKEN_ID AS ID1, TO_CHAR(TT.TAKEN_DATE, 'DD-MM-YYYY') D, 
    T.TEST_ID ID2, T.TYPE TYPE, A.ADMISSION_ID ID3, P.FIRST_NAME, P.LAST_NAME, TT.COST 
    COST, TT.REPORT REPORT FROM TEST_TAKEN TT JOIN TEST T ON T.TEST_ID = TT.TEST_ID 
    JOIN ADMISSION A ON TT.ADMISSION_ID = A.ADMISSION_ID JOIN PATIENT P ON P.PATIENT_ID 
    = A.PATIENT_ID ORDER BY TEST_TAKEN_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TEST-WISE ANALYSIS
app.get("/testwiseanalysis", async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        console.log(req.query)
        const query = `SELECT TEST_ID, TYPE, 
        NUMBER_OF_TIMES_TEST_DONE(test_id, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD')) DQ,
        TEST_REVENUE(test_id, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD')) DR
        FROM TEST`;
        const params = {
            startDate : `${startDate}`, endDate: `${endDate}`            
        };
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// day end revenue from tests
app.get("/testwiseanalysisday", async (req, res) => {
    try {
        const {GivenDate} = req.query;
        console.log(req.query)
        const query = `SELECT TT.TEST_ID, T.TYPE,
        COUNT(*) DQ,
        SUM(TT.COST) DR 
        FROM TEST_TAKEN TT
        JOIN TEST T ON T.TEST_ID = TT.TEST_ID
        WHERE TRUNC(TT.TAKEN_DATE) = TO_DATE(:GivenDate, 'YYYY-MM-DD')
        GROUP BY TT.TEST_ID, T.TYPE
        ORDER BY TT.TEST_ID`;
        const params = {
            GivenDate : `${GivenDate}`
        };
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// insert a test taken record
app.post("/teststakeninsertion", async(req, res) => {
    try {
        const { ADMISSION_ID, TEST_ID, REPORT } = req.body;
        console.log("Yay!" + req.body)
        const query = `INSERT INTO TEST_TAKEN (TAKEN_DATE, COST, ADMISSION_ID, TEST_ID, REPORT)
        VALUES (SYSDATE, (SELECT COST FROM TEST WHERE TEST_ID = TO_NUMBER(:1)), :2, :3, :4)`; // RETURNING *";
        const params = [TEST_ID, ADMISSION_ID, TEST_ID, REPORT];
        const result = await db_query(query, params);
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// TOP SELLING TESTS (YEARLY)
app.get("/toptestsyearly", async(req, res) => {
    const { year } = req.query;
    try {
    const query = `SELECT * FROM (
        SELECT TT.TEST_ID, T.TYPE, 
        COUNT(*) C, SUM(T.COST) S
        FROM TEST_TAKEN TT
        JOIN TEST T
        ON T.TEST_ID = TT.TEST_ID
        WHERE TO_CHAR(TT.TAKEN_DATE, 'YYYY') = TO_CHAR(:year)
        GROUP BY TT.TEST_ID, T.TYPE
        ORDER BY SUM(T.COST) DESC
        ) WHERE ROWNUM <= 5`;
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

app.get("/toptestsbymonth", async (req, res) => {
    try {
        const { month, year } = req.query; // Assuming month and year are sent as query parameters
        const query = `
        SELECT * FROM (
            SELECT TT.TEST_ID, T.TYPE, COUNT(*) C, SUM(T.COST) S
            FROM TEST_TAKEN TT
            JOIN TEST T
            ON T.TEST_ID = TT.TEST_ID
            WHERE TO_CHAR(TT.TAKEN_DATE, 'YYYY') = TO_CHAR(:year)
            and TO_NUMBER(TO_CHAR(TT.TAKEN_DATE, 'MM')) = TO_NUMBER(TO_CHAR(:month))
            GROUP BY TT.TEST_ID, T.TYPE
            ORDER BY SUM(T.COST) DESC
            ) 
        WHERE ROWNUM <= 5`;
        const params = {
            month : `${month}`, year: `${year}`
        };
        console.log(params)
        //const params = { name: `%${name}%`, name2: `%${name2}%`, description: `%${description}%`, manufacturer: `%${manufacturer}%`};
        const result = await db_query(query, params);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


module.exports = app;