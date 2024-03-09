import React, {Fragment, useEffect, useState} from "react";
import InputMedicine from "./InputMedicine";
import InputTest from "./InputTest";
import EditTest from "./Editing/EditTest";
import TestWiseAnalysis from "./Dashboard/TestWiseAnalysis";
import InputTestTaken from "./InputTestTaken";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";
let rowsFetched = -1;
let totalRows = 0;
function getTestNumber(report) {
    // Extract the test number from the report URL
    const match = report.match(/Test(\d+)\.pdf$/);
    if (match) {
      const testNumber = parseInt(match[1]);
      return testNumber > 0 && testNumber <= 12 ? testNumber : '';
    } else {
      return '';
    }
  }
  

const ListofTestsTaken = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState(""); // name -> TEST NAME
    const [name2, setName2] = useState(""); // DESCription
    const [pdf, setpdf] = useState()
    
    const Searcher = async e => { // searching records
        e.preventDefault();
        console.log(name);
        try {
        //const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}`);
        const response = await fetch(`http://localhost:5000/testsssearch/?name=${name}&name2=${name2}`);
        const parseResponse = await response.json();
        rowsFetched = parseResponse.length
        //setUsers(parseResponse);
        setMedicines(parseResponse);
        console.log(parseResponse);
        } catch (err) {
        console.error(err.message);
        } 
    };
    

    // DELETE FUNCTION
    const deleteMedicine = async (TEST_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/tests/${TEST_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setMedicines(prevTodos => prevTodos.filter(todo => todo.TEST_ID !== TEST_ID));
                console.log('Yay!!!');
            } else {
                console.log(`Error deleting MEDICINE with ID ${TEST_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMedicines = async() => {
        try {
            const response = await fetch("http://localhost:5000/teststakenlist"); // by default, fetch makes a get request
            const jsonData = await response.json();
            totalRows = jsonData.length;
            setMedicines(jsonData); // changing the data
            console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMedicines();
    }, []); // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
        <center>
    <a href = '#list2'> <button className="btn-primary"> View Tests Taken History</button> </a> <br/>
    <p></p>
    {/* <a href = '#form'> <button className="btn-primary">Add a Test </button> </a> */}
    </center>
        <p> </p> <p> </p>
    <center><TestWiseAnalysis /></center>

    <center><h1 class = "mt-5" id="list2"> LIST OF TESTS TAKEN</h1></center>
    
    <table class="table table-bordered mt-5 text-center table-dark table-striped table-sm" style={{width : '100%'}}>

    <thead>
      <tr>
        <th>TEST TAKEN ID</th>
        <th>TEST TAKEN DATE</th>
        <th> TEST_ID </th>
        <th>TEST NAME</th>
        <th>ADMISSION ID</th>
        <th> PATIENT NAME</th>
        <th>COST</th>
        <th style={{width: '8%'}}>REPORT</th>
      </tr>
    </thead>

    <tbody>
     

    {medicines.map(todo => (
        <tr>
            <td>
                 {todo.ID1}
            </td> 
            <td> {todo.D}  </td>
            <td> {todo.ID2}  </td>
            <td> {todo.TYPE}  </td>
            <td>{todo.ID3}</td>
            <td>{todo.FIRST_NAME + " " + todo.LAST_NAME}</td>
            <td>{todo.COST}</td>
            <td style={{width: '8%'}}>
                {/* {todo.REPORT && (
                <a href={`http://localhost:5000/pdf${getTestNumber(todo.REPORT)}`}>
                REPORT_{todo.ID1}
                </a>
                )} */}
                <td>
                {todo.ID1 <= 103 ? (
                <a href={`http://localhost:5000/pdf${getTestNumber(todo.REPORT)}`}>
                REPORT_{todo.ID1}
                </a>
                  ) : (
                todo.REPORT     
                  )}        
                </td>

            </td>
        </tr>
    ))}

    </tbody>
    </table>
    <p id="form"> </p>
    <InputTestTaken />
    </Fragment>
    )
}

export default ListofTestsTaken;