// displays all patients

import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
//import AdmDummy from "./AdmDummy";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";

const ListofPatients2 = () => {

    const [patients, setPatients] = useState([])

    // DELETE FUNCTION
    const deletePatient = async (PATIENT_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/patients2/${PATIENT_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                //setTodos(prevTodos => prevTodos.filter(todo => todo.TODO_ID !== TODO_ID));
                setPatients(prevTodos => prevTodos.filter(PATIENT => PATIENT.PATIENT_ID !== PATIENT_ID));
            } else {
                console.log(`Error deleting patient with ID ${PATIENT_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPatients = async() => {
        try {
            const response = await fetch("http://localhost:5000/patients2"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setPatients(jsonData); // changing the data
            console.log(jsonData);
            console.log("apsis");
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPatients();
    }, []); // the empty array makes it make only one request

    //console.log(todos);

    return (
    <Fragment>
    <h1> <center>ADMISSION HISTORY - PAGE 2</center> </h1>
    <table class="table table-bordered mt-5 table-dark table-responsive table-striped table-sm">

    <thead>
      <tr>
        <th>ADMISSION_ID</th>
        <th>ADMISSION DATE</th>
        <th>PATIENT_ID</th>
        <th>FIRST_NAME</th>
        <th>LAST_NAME</th>
        <th>EMAIL</th>
        <th>GENDER</th>
        <th>CONTACT_NO</th>
        <th>ADDRESS</th>
        <th> CITY</th>
        <th>DATE_OF_BIRTH</th>
      </tr>
    </thead>

    <tbody>
    {patients.map(p => (
        <tr>
            <td>{p.ADMISSION_ID}</td>
            <td>{p.DATEADM}</td>
            <td>{p.PATIENT_ID}</td>
            <td>{p.FIRST_NAME}</td>
            <td>{p.LAST_NAME}</td>
            <td>{p.EMAIL}</td>
            <td>{p.GENDER}</td>
            <td>{p.CONTACT_NO}</td>
            <td>{p.ADDRESS}</td>
            <td>{p.CITY}</td>
            <td>{p.DATE_OF_BIRTH}</td>
            <td> <button className="btn btn-warning"> Edit </button></td>
            <td> 
                <button className="btn btn-danger" onClick={() => deletePatient(p.PATIENT_ID)}>
                 Delete </button> 
            </td>
        </tr>
    ))}

    </tbody>
    </table>

    <p> </p>
    <p> </p>

    <Link to = "http://localhost:3000/patients">
       <center> <button class="btn-success"> Previous Page </button> </center>
    </Link>
    <p></p>
    <p></p>
    </Fragment>
    )
}

export default ListofPatients2;