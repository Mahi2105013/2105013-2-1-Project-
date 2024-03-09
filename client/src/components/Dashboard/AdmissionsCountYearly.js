import React, {Fragment, useEffect, useState} from "react";
import PatientWiseAnalysis from "./PatientWiseAnalysis";

const AdmissionCountYearly = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    
    const getMedicines = async e => {
        //e.preventDefault();
        try {
        
        const response = await fetch(`http://localhost:5000/admissioncountyearly`);
        const parseResponse = await response.json();
        setMedicines(parseResponse);
        console.log(parseResponse);

        } catch (err) {
        console.error(err.message);
        } 
    };

    useEffect(() => {
        getMedicines();
    }, []); // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>    
    <center><h1 class = "mt-5" id="list"> Admission Count (Yearly) </h1></center>
    
    <table class="table table-bordered table-dark table-striped table-sm">

    <thead>
      <tr>
        <th style={{width: '50%'}}>YEAR</th>
        <th>NUMBER OF ADMISSIONS</th>
      </tr>
    </thead>

    <tbody>
      {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
    </tr>*/}

    {medicines.map(todo => (
        <tr key = {todo.MEDICINE_ID}>
            <td>
                 {todo.YR}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.CNT}  </td>
        </tr>
    ))}

    </tbody>
    </table>
    </Fragment>
    )
}

export default AdmissionCountYearly;