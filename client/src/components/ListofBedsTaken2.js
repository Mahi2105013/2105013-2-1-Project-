import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
const ListofBedsTaken2 = () => {
    const [medicines, setMedicines] = useState([]);

    const [numberOfRows, setnumberOfRows] = useState(50);
    const rowsPerLoad = 100;

    const loadMoreRows = () => {
        setnumberOfRows(numberOfRows + rowsPerLoad);
    };

    const getMedicines = async() => {
        try {
            const response = await fetch("http://localhost:5000/bedstaken"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setMedicines(jsonData); // changing the data
            //console.log(jsonData)
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
            { " " }
    <div className="text-center">
    <h1> FULL HISTORY OF BEDS TAKEN </h1>

    <table class="table table-bordered mt-5 table-dark table-striped table-sm table-responsive">

    <thead>
      <tr>
        <th>BED TAKEN ID</th>
        <th>ADMISSION_ID</th>
        <th>PATIENT NAME</th>
        <th> DISEASE </th>
        <th>BED NUMBER</th>
        <th>ROOM NAME</th>
        <th>ROOM TYPE</th>
        <th>START DATE</th>
        <th>END DATE</th>
        <th style={{width: '5%'}}>COST PER NIGHT</th>
        <th style={{width: '10%'}}>NUMBER OF NIGHTS STAYED</th>

      </tr>
    </thead>

    <tbody>

    {medicines.slice(0, numberOfRows).map(todo => (
        <tr key = {todo.BED_TAKEN_ID}>
            <td>
                 {todo.BED_TAKEN_ID}
            </td> 
            <td>{todo.ADMISSION_ID}</td>
            <td> {todo.PATIENT_NAME}  </td>
            <td> {todo.DISEASE}  </td>
            <td> {todo.BED_NUMBER}  </td>
            <td> {todo.ROOM_NAME}  </td>
            <td> {todo.ROOM_TYPE}  </td>
            <td> {todo.S} </td> 
            <td> {todo.E} </td> 
            <td> {todo.COST_PER_NIGHT} </td> 
            <td> {todo.NUMBER_OF_NIGHTS_STAYED} </td>
        </tr>
    ))}
    </tbody>
    </table>

    <center>
    {numberOfRows < medicines.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button className="btn btn-warning" onClick={loadMoreRows}>
                                Load More Rows
                            </button>
                        </div>
                        )}
    </center>


    </div>
    <p> </p>
    <p> </p>
    {/* <InputMedicineTaken /> */}
    <p> </p>
    <p> </p>
    </Fragment>
    )
}

export default ListofBedsTaken2;