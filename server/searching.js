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

// dummy tutorial search code
app.get("/users", async (req, res) => {
    try {
      const { name } = req.query;
      const users = await pool.query(
        "SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
        [`%${name}%`]
      );
  
      res.json(users.rows);
    } catch (err) {
      console.error(err.message);
    }
});

app.get("/medicinessearch", async (req, res) => {
    try {
        console.log(req.query);
        const { name, name2, description, manufacturer } = req.query; // Access query parameter using req.query
        console.log(name) // generic name
        console.log(name2) // trade name
        //const params = { name: `%${name}%` }; // Bind variables should be an object with property names matching placeholders
        const query = `SELECT * FROM MEDICINE WHERE LOWER(GENERIC_NAME) LIKE LOWER(:name) 
        AND LOWER(TRADE_NAME) LIKE LOWER(:name2) AND LOWER(DESCRIPTION) LIKE LOWER(:description) 
        AND LOWER(MANUFACTURER) LIKE LOWER(:manufacturer)`;
        const params = { name: `%${name}%`, name2: `%${name2}%`, description: `%${description}%`, manufacturer: `%${manufacturer}%`};
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" }); // Handle error and send appropriate response
    }
});

// tests search
app.get("/testsssearch", async (req, res) => {
    try {
        console.log(req.query);
        const { name, name2 } = req.query;
        console.log(name)
        console.log(name2) 
        const query = `SELECT * FROM TEST WHERE LOWER(TYPE) LIKE LOWER(:name) AND LOWER(DESCRIPTION) LIKE LOWER(:name2)`
        const params = { name: `%${name}%`, name2: `%${name2}%`};
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  
module.exports = app;