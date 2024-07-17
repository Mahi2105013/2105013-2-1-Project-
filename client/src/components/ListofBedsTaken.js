import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom"; 
import InputMedicine from "./InputMedicine";
import EditMedicine from "./Editing/EditMedicine";
import DischargeForm from "./Bed Management/DischargeForm";
import ChangeBedForm from "./Bed Management/ChangeBedForm";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";
let rowsFetched = -1;
let totalRows = 0;

const ListofBedsTakenList = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState('')

    const Searcher = async e => {
        if (e) {
            e.preventDefault(); // Check if the event object exists before calling preventDefault
        }
        
        try {
        //const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}`);
        const response = await fetch(`http://localhost:5000/bedstakenoccsearch/?name=${name}`);
        const parseResponse = await response.json();
        rowsFetched = parseResponse.length
        //setUsers(parseResponse);
        setMedicines(parseResponse);
        

        } catch (err) {
        console.error(err.message);
        } 
    };

    const getMedicines = async() => {
        try {
            setEmail(localStorage.getItem('email'))
            const response = await fetch("http://localhost:5000/bedstakenocc"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();
            totalRows = jsonData.length

            setMedicines(jsonData); // changing the data
            console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMedicines();
        Searcher();
    }, []); // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
    
    {email !== 'admin@gmail.com' && <h1> <center> Sorry, you are not entitled to access this information!</center></h1>}
    {email !== 'admin@gmail.com' && <div>
        <p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p><p>.</p>
    </div>}


    {email === 'admin@gmail.com' && <div>
    <Link to = "http://localhost:3000/bedstaken2">
       <center> <button class="btn-success">
        Click Here to 
       view Full History <br /> of Beds Taken </button> </center>
    </Link>

    <center><h1 class = "mt-5" id="list"> SEARCH FOR A HOSPITALISED PATIENT: </h1></center>
    <form onSubmit={Searcher} className="text-center" style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
        <center>
          <label for="name"> PATIENT NAME: </label>
          <input
          type="text"
          name="name"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter patient name ..."
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        </center>
        <p></p> <p></p>
          <button className="btn btn-primary">SEARCH</button>
    </form>



    <center><h1 class = "mt-5" id="list"> LIST OF OCCUPIED BEDS AND CURRENTLY HOSPITALISED PATIENTS </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm table-responsive">

    <thead>
      <tr>
      <th>BED TAKEN ID</th>
      <th>ADMISSION ID</th>
        <th>PATIENT NAME</th>
        <th> DISEASE </th>
        <th> BED ID </th>
        <th>BED NUMBER</th>
        <th>ROOM NAME</th>
        <th>ROOM TYPE</th>
        <th>START DATE</th>
        <th style={{width: '5%'}}>COST PER NIGHT</th>
        <th style={{width: '10%'}}>NUMBER OF NIGHTS STAYED SO FAR</th>
      </tr>
    </thead>

    <tbody>
    {medicines.map(todo => (
        <tr key = {todo.BED_TAKEN_ID}>
            <td>
                 {todo.BED_TAKEN_ID}
            </td> 
            <td> {todo.ADMISSION_ID} </td>
            <td> {todo.PATIENT_NAME}  </td>
            <td> {todo.DISEASE}  </td>
            <td> {todo.BED_ID}  </td>
            <td> {todo.BED_NUMBER}  </td>
            <td> {todo.ROOM_NAME}  </td>
            <td> {todo.ROOM_TYPE}  </td>
            <td> {todo.S} </td> 
            <td> {todo.COST_PER_NIGHT} </td> 
            <td> {todo.NUMBER_OF_NIGHTS_STAYED} </td>
        </tr>
    ))}
    </tbody>
    </table>

    <p></p>
    <p></p>
    <DischargeForm />
    <p></p>
    <p></p>
    <ChangeBedForm />
    <p></p>
    <p></p>

    
    <p></p>
    <p></p>

    </div>}
    </Fragment>
    )
}

export default ListofBedsTakenList;