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

// GET -> get all todos
// POST -> inserting data

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

const helperAppMedicine = require('./medicineshelper');
app.use(helperAppMedicine);

const helperAppTest = require('./testshelper');
app.use(helperAppTest);

const helperAppBed = require('./bedhelper');
app.use(helperAppBed);

const helperAppSearch = require('./searching');
app.use(helperAppSearch);

const helperAppEdit = require('./editing, updating');
app.use(helperAppEdit);

const testreports = require('./testreports');
app.use(testreports);


app.get("/loggingin", async(req, res) => {
    try {
    const query = "SELECT * FROM USERS";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// NOW WITH THE HOSPITAL DB PORTION

//get all patients PART 1
app.get("/patients", async(req, res) => {
    try {
    const query = `SELECT A.ADMISSION_ID, TO_CHAR(A.DATE_OF_ADMISSION, 'DD/MM/YYYY') 
    AS DATEADM,
    P.* FROM ADMISSION A LEFT OUTER JOIN PATIENT P ON A.PATIENT_ID = P.PATIENT_ID 
    wheRE TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) >= 2024 
    order BY A.DATE_OF_ADMISSION DESC`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

//get all patients PART 2
app.get("/patients2", async(req, res) => {
    try {
    const query = `SELECT A.ADMISSION_ID, TO_CHAR(A.DATE_OF_ADMISSION, 'DD/MM/YYYY') AS DATEADM,
     P.* FROM ADMISSION A LEFT OUTER JOIN PATIENT P ON A.PATIENT_ID = P.PATIENT_ID wheRE 
     TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) <= 2023 order BY A.DATE_OF_ADMISSION DESC`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// patient admission count monthly
app.get("/admissioncountmonthly", async(req, res) => {
    try {
    const { year } = req.query;
    const query = `SELECT TO_CHAR(DATE_OF_ADMISSION, 'YYYY, MONTH') month, COUNT(*) as cnt 
    FROM ADMISSION where TO_CHAR(DATE_OF_ADMISSION, 'YYYY') = :year GROUP BY 
    TO_CHAR(DATE_OF_ADMISSION, 'YYYY, MONTH'),  TO_CHAR(DATE_OF_ADMISSION, 'YYYY'), 
    TO_NUMBER(TO_CHAR(DATE_OF_ADMISSION, 'MM')) ORDER BY TO_CHAR(DATE_OF_ADMISSION, 'YYYY') 
    DESC,  TO_NUMBER(TO_CHAR(DATE_OF_ADMISSION, 'MM')) DESC`;
    const params = {
         //year: `${year}`
         year: year
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// patient admission count yearly
app.get("/admissioncountyearly", async(req, res) => {
    try {
    const query = `SELECT TO_CHAR(DATE_OF_ADMISSION, 'YYYY') as yr, COUNT(*) as cnt
    FROM ADMISSION
    GROUP BY TO_CHAR(DATE_OF_ADMISSION, 'YYYY')
    ORDER BY TO_NUMBER(TO_CHAR(DATE_OF_ADMISSION, 'YYYY')) DESC`;
    const params = []
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// group patients by age (age at the time of admission)
app.get("/grouppatientsbyage", async(req, res) => {
    try {
    const { month, year } = req.query;
    const query = 
    `SELECT
    CASE 
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) < 5
        THEN '0 TO 5'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 6 AND 10
        THEN '6 TO 10'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 11 AND 20
        THEN '11 TO 20'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 21 AND 30
        THEN '21 TO 30'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 31 AND 40
        THEN '31 TO 40'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 41 AND 50
        THEN '41 TO 50'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) > 50
        THEN '> 50'
    END AS "AGE_GROUP", COUNT(*) as cnt
    FROM PATIENT p join ADMISSION A
    ON P.PATIENT_ID = A.PATIENT_ID
    WHERE TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY') = TO_CHAR(:year) AND TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'MM')) = :month
    GROUP BY -- SUBSTR(date_column, -4)
    CASE 
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) < 5
        THEN '0 TO 5'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 6 AND 10
        THEN '6 TO 10'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 11 AND 20
        THEN '11 TO 20'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 21 AND 30
        THEN '21 TO 30'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 31 AND 40
        THEN '31 TO 40'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) BETWEEN 41 AND 50
        THEN '41 TO 50'
        WHEN TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) - TO_NUMBER(substr(DATE_OF_BIRTH, -4)) > 50
        THEN '> 50'
    END
    ORDER BY "AGE_GROUP"`;
    
    const params = {
         year: `${year}` , month: `${month}`
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// latest admitted patient
app.get("/latestadmittedpatient", async(req, res) => {
    try {
    const query = `SELECT * FROM
    (SELECT A.ADMISSION_ID as admid, TO_CHAR(A.DATE_OF_ADMISSION, 'DD/MM/YYYY') AS DATEADM, 
    P.* FROM ADMISSION A LEFT OUTER JOIN PATIENT P ON A.PATIENT_ID = P.PATIENT_ID 
    wheRE TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) >= 2024 order BY A.DATE_OF_ADMISSION DESC)
    WHERE ROWNUM = 1`
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get a patient
app.get("/patients/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = "SELECT * FROM PATIENT where PATIENT_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// UPDATING (EDITING) - WILL DO LATER

// INSERTING PATIENTS
app.post("/patients", async(req, res) => {
    try {
        const {FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE, BED_ID} = req.body;
        const query1 = `DECLARE
        ERRORVAR NUMBER := 1;
        BEGIN
        FOR R IN (select b.bed_id AS BID from bed b 
        WHERE B.BED_ID NOT IN
        (SELECT BED_ID FROM BED_TAKEN
        WHERE END_DATE IS NULL)) 
        LOOP
            IF :BED_ID = R.BID THEN ERRORVAR := 0;
            END IF;
        END LOOP;
        IF ERRORVAR = 1 THEN ERRORVAR := 1/0;
        END IF;
        END;
        `
        const params1 = [BED_ID]
        const result1 = await db_query(query1, params1);
        const query = "INSERT INTO PATIENT (FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)"; // RETURNING *";
        const params = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE];
        await db_query(query, params);

        await db_query(`INSERT INTO ADMISSION
        (DATE_OF_ADMISSION, PATIENT_ID)
        VALUES (SYSDATE, (SELECT MAX(PATIENT_ID) FROM PATIENT))`, []);

        const query2 = `INSERT INTO BED_TAKEN (BED_ID, START_DATE, COST_PER_NIGHT, ADMISSION_ID, NUMBER_OF_NIGHTS_STAYED)
        VALUES (:1, SYSDATE, 
        (SELECT COST_PER_NIGHT FROM BED WHERE BED_ID = :2),
        (SELECT MAX(ADMISSION_ID) FROM ADMISSION), 0
        )`
        const params2 = [BED_ID, BED_ID]
        const result = await db_query(query2, params2);
        //const query3 = 
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETING PATIENTS
app.delete("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM PATIENT WHERE PATIENT_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








// DOCTORS

//get all doctors
app.get("/doctors", async(req, res) => {
    try {
    const query = `select d1.DOCTOR_ID, d1.FIRST_NAME, d1.LAST_NAME, D2.DEPARTMENT_NAME,
    d1.SPECIALITY, d1.CONTACT_NO FROM DOCTOR d1 JOIN DEPARTMENT D2 ON d1.DEPARTMENT_ID = D2.ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get a doctor
app.get("/doctors/:id", async(req, res) => {
    try {
    const {id} = req.params;
    //const query = "SELECT * FROM PATIENT where PATIENT_ID = $1";
    const query = "select d1.FIRST_NAME, d1.LAST_NAME, D2.DEPARTMENT_NAME, d1.SPECIALITY, d1.CONTACT_NO FROM DOCTOR D1 JOIN DEPARTMENT D2 ON D1.DEPARTMENT_ID = D2.ID WHERE where D1.DOCTOR_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// UPDATING (EDITING) - WILL DO LATER

// INSERTING DOCTORS
app.post("/doctors", async(req, res) => {
    try {
        const {FIRST_NAME, LAST_NAME, CONTACT_NO, SPECIALIY, DEPARTMENT_ID} = req.body;

        const query = `INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, 
        CONTACT_NO, SPECIALIY, DEPARTMENT_ID) VALUES (:1, :2, :3, :4, :5)`; // RETURNING *;
        const params = [FIRST_NAME, LAST_NAME, CONTACT_NO, SPECIALIY, DEPARTMENT_ID];

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

// DELETING DOCTORS
app.delete("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM DOCTOR WHERE DOCTOR_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// TOTAL ADMISSIONS
app.get("/admission", async(req, res) => {
    try {
    const query = "SELECT COUNT(*) AS TOTAL FROM ADMISSION";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TOTAL ADMISSIONS THIS YEAR
app.get("/admissionyear", async(req, res) => {
    try {
    const query = `SELECT COUNT(*) AS TOTAL FROM ADMISSION WHERE TO_CHAR(SYSDATE, 'YYYY') 
    = TO_CHAR(DATE_OF_ADMISSION, 'YYYY')`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TOTAL ADMISSIONS THIS MONTH
app.get("/admissionmonth", async(req, res) => {
    try {
    const query = `SELECT COUNT(*) AS TOTAL FROM ADMISSION WHERE 
    TO_CHAR(SYSDATE, 'YYYY') = TO_CHAR(DATE_OF_ADMISSION, 'YYYY') 
    AND TO_CHAR(SYSDATE, 'MONTH') = TO_CHAR(DATE_OF_ADMISSION, 'MONTH')`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// TOTAL ADMISSIONS last MONTH
app.get("/admissionlastmonth", async(req, res) => {
    try {
    const query = `SELECT COUNT(*) AS TOTAL FROM ADMISSION WHERE TO_CHAR(SYSDATE, 'YYYY') 
    = TO_CHAR(DATE_OF_ADMISSION, 'YYYY') AND TO_NUMBER(TO_CHAR(DATE_OF_ADMISSION ,'MM')) 
    = TO_NUMBER(TO_CHAR(SYSDATE ,'MM')) - 1`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get REVENUE OF A DAY
app.get("/everydayrevenue", async(req, res) => {
    try {
    const {GivenDate} = req.query;
    const query = `SELECT 
    (SELECT NVL(SUM(QUANTITY * UNIT_COST), 0) -- EACH DAY MED
    FROM MEDICINE_TAKEN
    WHERE TRUNC(TAKEN_DATE) = TO_DATE(:GivenDate, 'YYYY-MM-DD')) AS MED,  
    (SELECT NVL(SUM(COST), 0) -- EACH DAY TEST
    FROM TEST_TAKEN
    WHERE TRUNC(TAKEN_DATE) = TO_DATE(:GivenDate, 'YYYY-MM-DD')) AS T,
    (SELECT NVL(SUM(COST_PER_NIGHT), 0)-- EACH DAY BED
    FROM BED_TAKEN
    WHERE TO_DATE(:GivenDate, 'YYYY-MM-DD') BETWEEN START_DATE AND 
    NVL(END_DATE, SYSDATE))
    AS B,
    EVERYDAY_REVENUE_FUNC(TO_DATE(:GivenDate, 'YYYY-MM-DD')) AS EV
    FROM DUAL`;
    const params = {
        GivenDate : `${GivenDate}`
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

app.get("/diseasegrouping", async (req, res) => {
    try {
        //const { month, year } = req.query; // Assuming month and year are sent as query parameters
        const {startDate, endDate} = req.query;
        console.log(req.query)
        const query = `SELECT P.DISEASE D, 
        COUNT(*) PATIENTS_WITH_THAT_DISEASE,
        MAX(ROUND((NVL(B.END_DATE, SYSDATE) - B.START_DATE), 0)) MAX_DAYS_ADMITTED,
        MIN(ROUND((NVL(B.END_DATE, SYSDATE) - B.START_DATE), 0)) MIN_DAYS_ADMITTED,
        ROUND(AVG(ROUND((NVL(B.END_DATE, SYSDATE) - B.START_DATE), 0)), 2) AVG_DAYS_ADMITTED
        FROM ADMISSION A
        JOIN PATIENT P ON A.PATIENT_ID = P.PATIENT_ID
        JOIN BED_TAKEN B ON B.ADMISSION_ID = A.ADMISSION_ID
        WHERE A.DATE_OF_ADMISSION BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD')
        AND TO_DATE(:endDate, 'YYYY-MM-DD')
        GROUP BY P.DISEASE`;
        const params = {
            startDate : `${startDate}`, endDate: `${endDate}`            
        };
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// BILLING
app.get("/billing", async(req, res) => {
    try {
    const { name } = req.query;
    const query = `
    SELECT A.ADMISSION_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    NVL(SUM(B.COST_PER_NIGHT * B.NUMBER_OF_NIGHTS_STAYED),0) BED_TAKEN_BILL,
    NVL(SUM(T.COST), 0) TEST_TAKEN_BILL,
    NVL(SUM(M.QUANTITY * M.UNIT_COST),0) MEDICINE_TAKEN_BILL,
    BILLING(A.ADMISSION_ID) TOTAL_BILL
    FROM ADMISSION A
    LEFT OUTER JOIN BED_TAKEN B
    ON A.ADMISSION_ID = B.ADMISSION_ID
    LEFT OUTER JOIN TEST_TAKEN T
    ON A.ADMISSION_ID = T.ADMISSION_ID
    LEFT OUTER JOIN MEDICINE_TAKEN M
    ON A.ADMISSION_ID = M.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P
    ON A.PATIENT_ID = P.PATIENT_ID
    GROUP BY A.ADMISSION_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME)
    HAVING LOWER(P.FIRST_NAME || ' ' || P.LAST_NAME)
    LIKE lower('%' || :name || '%')
    ORDER BY A.ADMISSION_ID
    `;
    const params = {
        name: `${name}`  
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// all billing
app.get("/billingall", async(req, res) => {
    try {
    // const query2 = `BEGIN
    //     CALCULATE_NIGHTS_STAYED;
    //     END;`;
    // const result2 = await db_query(query2, []);
    // res.status(200).json(result2);

    //const { admid, name } = req.query;
    const query = `SELECT A.ADMISSION_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME) PATIENT_NAME,
    NVL(SUM(B.COST_PER_NIGHT * B.NUMBER_OF_NIGHTS_STAYED),0) BED_TAKEN_BILL,
    NVL(SUM(T.COST), 0) TEST_TAKEN_BILL,
    NVL(SUM(M.QUANTITY * M.UNIT_COST),0) MEDICINE_TAKEN_BILL,
    BILLING(A.ADMISSION_ID) TOTAL_BILL
    FROM ADMISSION A
    LEFT OUTER JOIN BED_TAKEN B
    ON A.ADMISSION_ID = B.ADMISSION_ID
    LEFT OUTER JOIN TEST_TAKEN T
    ON A.ADMISSION_ID = T.ADMISSION_ID
    LEFT OUTER JOIN MEDICINE_TAKEN M
    ON A.ADMISSION_ID = M.ADMISSION_ID
    LEFT OUTER JOIN PATIENT P
    ON A.PATIENT_ID = P.PATIENT_ID
    GROUP BY A.ADMISSION_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME)
    ORDER BY A.ADMISSION_ID
    `;
    const result = await db_query(query,[]);
    res.status(200).json(result);
    } catch (error) {
        console.log(error);
        console.log("ERROR! NO!");
    }
});


// EXECUTING PROCEDURES
// calc nightts stayed
app.get("/calcnightsstayed", async(req, res) => {
    try {
    const { id } = req.query;
    const query = `
    BEGIN
    CALCULATE_NIGHTS_STAYED;
    END;
    `;
    const params = {};
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// CALC CALCULATE_CAPACITY_OF_ROOM
app.get("/calcroomcapacity", async(req, res) => {
    try {
    const query = `
    BEGIN
    CALCULATE_CAPACITY_OF_ROOM;
    END;
    `;
    const params = {};
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// FINDING INFO ABOUT EACH ADMISSION ID: 4 STEPS:
// 1 - PATIENT INFO
app.get("/patientinfo", async(req, res) => {
    try {
    const { id } = req.query;
    const query = `
    SELECT A.ADMISSION_ID, TO_CHAR(A.DATE_OF_ADMISSION, 'DD/MM/YYYY') AS DATE_OF_ADMISSION
    , TO_CHAR(A.DISCHARGE_DATE, 'DD/MM/YYYY') AS DISCHARGE_DATE, P.*
    FROM PATIENT P
    JOIN ADMISSION A 
    ON P.PATIENT_ID = A.PATIENT_ID
    WHERE A.ADMISSION_ID = :id
    `;
    const params = {
        id: `${id}`  
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// 2 - medicine info
app.get("/medicineinfo", async(req, res) => {
    try {
    const { id } = req.query;
    const query = `
    SELECT MT.*, M.*, (MT.QUANTITY*MT.UNIT_COST) AS TOTAL
    FROM ADMISSION A 
    JOIN MEDICINE_TAKEN MT
    ON A.ADMISSION_ID = MT.ADMISSION_ID
    JOIN MEDICINE M
    ON MT.MEDICINE_ID = M.MEDICINE_ID
    WHERE A.ADMISSION_ID = :id
    `;
    const params = {
        id: `${id}`  
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// 3- tests
app.get("/testinfo", async(req, res) => {
    try {
    const { id } = req.query;
    const query = `
    SELECT MT.*, M.*--, MT.QUANTITY*MT.UNIT_COST
    FROM ADMISSION A 
    JOIN TEST_TAKEN MT
    ON A.ADMISSION_ID = MT.ADMISSION_ID
    JOIN TEST M
    ON MT.TEST_ID = M.TEST_ID
    WHERE A.ADMISSION_ID = :id
    `;
    const params = {
        id: `${id}`  
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// 4 - beds he took
app.get("/bedinfo", async(req, res) => {
    try {
    const { id } = req.query;
    const query = `
    SELECT MT.*, M.*, (MT.COST_PER_NIGHT * MT.NUMBER_OF_NIGHTS_STAYED), R.*--, MT.QUANTITY*MT.UNIT_COST
    FROM ADMISSION A 
    JOIN BED_TAKEN MT
    ON A.ADMISSION_ID = MT.ADMISSION_ID
    JOIN BED M
    ON MT.BED_ID = M.BED_ID
    JOIN ROOM R
    ON R.ROOM_ID = M.ROOM_ID
    WHERE A.ADMISSION_ID = :id
    `;
    const params = {
        id: `${id}`  
    };
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// server is at 5000 & react is at 3000
app.listen(5000, () => {
    //console.log("server listening at port 5000");
    console.log("Server has started on port 5000! Way to go!");
})
