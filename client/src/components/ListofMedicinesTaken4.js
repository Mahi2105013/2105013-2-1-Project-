import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofMedicinesTaken4 = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    const [medicinestakenbill, setMedicinestakenbill] = useState([]);
    const [medicinestakencount, setMedicinestakencount] = useState([]);

    // DELETE FUNCTION
    /*const deleteMedicine = async (MEDICINE_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/medicines/${MEDICINE_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setMedicines(prevTodos => prevTodos.filter(todo => todo.MEDICINE_ID !== MEDICINE_ID));
            } else {
                console.log(`Error deleting todo with ID ${MEDICINE_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }*/

    const getMedicines = async() => {
        try {
            const response = await fetch("http://localhost:5000/medicinestaken4"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setMedicines(jsonData); // changing the data
            //console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getMedicinesTakenCount = async() => {
        try {
            const response = await fetch("http://localhost:5000/medicinestakencount"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setMedicinestakencount(jsonData); // changing the data
            //console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getMedicinesTakenBill = async() => {
        try { 
            const response = await fetch("http://localhost:5000/medicinestakenbill"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            //if(typeof jsonData === 'number')
            //    setMedicinestakenbill(jsonData); // array
            //else
            //    setMedicinestakenbill(jsonData); // object

            setMedicinestakenbill(jsonData); // changing the data
            console.log(jsonData); //  // THESE ARE PRINTING CORRECTLY
            console.log("hello bro!"); // THESE ARE PRINTING CORRECTLY
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMedicines();
        getMedicinesTakenBill();
        getMedicinesTakenCount();
    }, []); // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
            { " " }
    
    <center><h1 class = "mt-5"> LIST OF MEDICINES TAKEN - page 3 </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
      <th style={{width : '10%'}}> MEDICINE TAKEN ID</th>
        <th>ADMISSION_ID</th>
        <th>PATIENT NAME</th>
        <th> MEDICINE ID </th>
        <th>MEDICINE_NAME</th>
        <th>MANUFACTURER</th>
        <th>UNIT_COST</th>
        <th>QUANTITY</th>
        <th>TOTAL_COST (TAKA)</th>
      </tr>
    </thead>

    <tbody>
      {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
    </tr>*/}

    {medicines.map(todo => (
        <tr>
            <td> {todo.MEDICINE_TAKEN_ID} </td>
            <td> {todo.ADMISSION_ID}  </td>
            <td STYLE = "width: 20%;">
                 {todo.PATIENT_NAME}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            
            <td> {todo.MEDICINE_ID}  </td>
            <td> {todo.MEDICINE_NAME}  </td>
            <td> {todo.MANUFACTURER}  </td>
            <td> {todo.UNIT_COST}  </td>
            <td> {todo.QUANTITY}  </td>
            <td> {todo.TOTAL_COST}  </td>
        </tr>
    ))}

    </tbody>
    </table>
    <p></p>
    <p></p>
    <Link to = "http://localhost:3000/medicinestaken3">
       <center> <button class="btn-success"> Previous Page </button> </center>
    </Link>
    <p></p>
    <p></p>
    </Fragment>
    )
}

export default ListofMedicinesTaken4;