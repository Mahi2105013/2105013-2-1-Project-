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

const fs = require('fs');
const path = require('path');
// downloading test report 1
app.get('/pdf1', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test1.pdf');
  
    // Resolve the real path of the PDF file
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Create a read stream
      const stream = fs.createReadStream(resolvedPath);
  
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
  
      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      
      // Pipe the stream to the response
      stream.pipe(res);
    });
  });


  app.get('/pdf2', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test2.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });


  app.get('/pdf3', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test3.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });


  app.get('/pdf4', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test4.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf5', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test5.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf6', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test6.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });


  app.get('/pdf7', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test7.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf8', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test8.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf9', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test9.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf10', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test10.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf11', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test11.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });

  app.get('/pdf12', (req, res) => {
    const pdfPath = path.join(__dirname, 'Test Reports/Test12.pdf');
    fs.realpath(pdfPath, (err, resolvedPath) => {
      if (err) {
        console.error('Error resolving path:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const stream = fs.createReadStream(resolvedPath);
      stream.on('error', (err) => {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Internal Server Error');
      });
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  });


module.exports = app;