import React, {Fragment, useEffect, useState, useRef} from "react";
let rowsFetched = -1;
let totalRows = 0;

const Billing = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    //
    //const [admid, setadmid] = useState("");
    const [name, setName] = useState(""); // name -> searchMedicine

    useEffect(() => {
        getMedicines();
        Searcher();
    }, []);

    const Searcher = async e => {
        if (e) {
            e.preventDefault(); // Check if the event object exists before calling preventDefault
        }
        
        try {
        //const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}`);
        const response = await fetch(`http://localhost:5000/billing/?name=${name}`);
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
            const response = await fetch("http://localhost:5000/billingall"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();
            totalRows = jsonData.length

            setMedicines(jsonData); // changing the data
            
        } catch (error) {
            console.log(error.message)
        }
    }

     // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
    <center><h1 class = "mt-5" id="list"> SEARCH FOR BILLING OF AN ADMISSION RECORD: </h1></center>
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
    <center>
   {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows ? ("Number of matching results: " + rowsFetched) : ""}
   {rowsFetched === 0 ? "No results matched" : ""}
   </center>

    <center><h1 class = "mt-5" id="list"> BILLING </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
        <th>ADMISSION ID</th>
        <th>PATIENT NAME</th>
        <th> BED_TAKEN_BILL </th>
        <th>TEST_TAKEN_BILL</th>
        <th>MEDICINE_TAKEN_BILL</th>
        <th>TOTAL_BILL</th>
      </tr>
    </thead>

    <tbody>
    {medicines.map(todo => (
        <tr key = {todo.ADMISSION_ID}>
            <td>{todo.ADMISSION_ID}</td> 
            <td> {todo.PATIENT_NAME}  </td>
            <td> {todo.BED_TAKEN_BILL}  </td>
            <td> {todo.TEST_TAKEN_BILL}  </td>
            <td> {todo.MEDICINE_TAKEN_BILL}  </td>
            <td> {todo.TOTAL_BILL}  </td>
        
        </tr>
    ))}

    </tbody>
    </table>
    <p id="form"> </p>
    </Fragment>
    )
}

export default Billing;