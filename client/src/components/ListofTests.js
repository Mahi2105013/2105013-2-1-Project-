import React, {Fragment, useEffect, useState} from "react";
import InputMedicine from "./InputMedicine";
import InputTest from "./InputTest";
import EditTest from "./Editing/EditTest";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";
let rowsFetched = -1;
let totalRows = 0;

const ListofTests = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState(""); // name -> TEST NAME
    const [name2, setName2] = useState(""); // DESCription
    const [pdf, setpdf] = useState()
    
    const Searcher = async e => {
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
            const response = await fetch("http://localhost:5000/tests"); // by default, fetch makes a get request
            //const response = await fetch("http://localhost:5000/teststaken")
            // we will get json data back
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
    <a href = '#list2'> <button className="btn-primary"> View Tests</button> </a> <br/>
    <p></p>
    <a href = '#form'> <button className="btn-primary">Add a Test </button> </a>
    </center>

    <center><h1 class = "mt-5" id="list"> SEARCH FOR A TEST: </h1></center>
    <form onSubmit={Searcher} className="text-center" style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
        <center>
        <label for="name"> TEST NAME: </label>
          <input
            type="text"
            name="name"
            style={{ width: '300px', height: '30px' }}
            placeholder="Enter test name ..."
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label for="name2"> DESCRIPTION: </label> <br/>
          <input
          type="text"
          name="name2"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter test description ..."
          classname="form-control"
          value={name2}
          onChange={e => setName2(e.target.value)}
        />
        
        </center>
        <p></p> <p></p>
          <button className="btn btn-primary">SEARCH</button>
    </form>
    <center>
   {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows ? ("Number of matching results: " + rowsFetched) : ""}
   {rowsFetched === 0 ? "No results matched" : ""}
   </center>

    <center><h1 class = "mt-5" id="list2"> LIST OF TESTS </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm table-responsive">

    <thead>
      <tr>
        <th>TEST ID</th>
        <th>TEST NAME</th>
        <th> DESCRIPTION </th>
        <th>COST (TAKA)</th>
      </tr>
    </thead>

    <tbody>
     

    {medicines.map(todo => (
        <tr key = {todo.TEST_ID}>
            <td>
                 {todo.TEST_ID}
            </td> 
            <td> {todo.TYPE}  </td>
            <td class = "col-5"> {todo.DESCRIPTION}  </td>
            <td> {todo.COST}  </td>
            <td> <EditTest todo={todo}/> </td>
            <td> 
                <button className="btn btn-danger" onClick={() => deleteMedicine(todo.TEST_ID)}>
                 Delete </button> 
            </td>
        </tr>
    ))}

    {/* {medicines.map(todo => (
        <tr key = {todo.TEST_TAKEN_ID}>
            <td>
                 {todo.TEST_TAKEN_ID}
            </td> 
            <td> {todo.COST}  </td>
            <td class = "col-5"> 
                {todo.REPORT && (
                    //<button onclick="Searcher()">Open PDF</button>
                    //<a href={todo.REPORT} target="_blank">{todo.REPORT}</a>
                    <a href="http://localhost:5000/pdf">Download PDF! LoL!</a>

                )}
            </td>
            <td> {todo.ADMISSION_ID}  </td>
            <td> <EditTest todo={todo}/> </td>
            <td> 
                <button className="btn btn-danger" onClick={() => deleteMedicine(todo.TEST_ID)}>
                 Delete </button> 
            </td>
        </tr>
    ))} */}

    </tbody>
    </table>
    <p id="form"> </p>
    <InputTest />
    </Fragment>
    )
}

export default ListofTests;