// displays all patients

import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
//import AdmDummy from "./AdmDummy";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";

const ListofPatients = () => {

    const [patients, setPatients] = useState([])
    const [latestBeta, setlatestBeta] = useState([])

    // DELETE FUNCTION
    const deletePatient = async (PATIENT_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/patients/${PATIENT_ID}`, {
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
            const response = await fetch("http://localhost:5000/patients"); // by default, fetch makes a get request
            const res2 = await fetch("http://localhost:5000/latestadmittedpatient");
            // we will get json data back
            const jsonData = await response.json();
            const jsonData2 = await res2.json();

            setPatients(jsonData); // changing the data
            setlatestBeta(jsonData2);
            console.log(jsonData2)
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
    {/* <h1 className="text-center"> LATEST ADMITTED PATIENT </h1>
    <table style={{width: '600px', margin: '0 auto'}} class="table text-center table-bordered mt-2 table-dark table-striped table-sm">
        <tr>
            <td style={{width: '50%'}}>Admission ID</td>
            <td style={{width: '50%'}}>{latestBeta[0].ADMID}</td>
        </tr>
        <tr>
            <td>Date of Admission</td>
            <td>{latestBeta[0].DATEADM}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Patient ID</td>
            <td style={{width: '50%'}}>{latestBeta[0].PATIENT_ID}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>First Name</td>
            <td style={{width: '50%'}}>{latestBeta[0].FIRST_NAME}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Last Name</td>
            <td style={{width: '50%'}}>{latestBeta[0].LAST_NAME}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Email</td>
            <td style={{width: '50%'}}>{latestBeta[0].EMAIL}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Gender</td>
            <td style={{width: '50%'}}>{latestBeta[0].GENDER}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Contact Number</td>
            <td style={{width: '50%'}}>{latestBeta[0].CONTACT_NO}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>City</td>
            <td style={{width: '50%'}}>{latestBeta[0].CITY}</td>
        </tr>
        <tr>
            <td style={{width: '50%'}}>Date of Birth</td>
            <td style={{width: '50%'}}>{latestBeta[0].DATE_OF_BIRTH}</td>
        </tr>
    </table>
    <p></p> <p></p> <p></p> <p></p> <p></p> <p></p>
     */}
    
    <h1> <center>ADMISSION HISTORY </center> </h1>
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
            <td> <button className="btn btn-warning"> Edit  </button></td>
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

    <Link to = "http://localhost:3000/patients2">
       <center> <button class="btn-success"> Next Page </button> </center>
    </Link>
    <p></p>
    <p></p>
    </Fragment>
    )
}

export default ListofPatients;