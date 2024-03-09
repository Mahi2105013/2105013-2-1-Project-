import React, {Fragment, useEffect, useState} from "react";
import InputMedicine from "./InputMedicine";
import EditMedicine from "./Editing/EditMedicine";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";
let rowsFetched = -1;
let totalRows = 0;

const ListofMedicines = () => {

    //const [todos, setTodos] = useState([])
    const [medicines, setMedicines] = useState([]);
    //
    const [name, setName] = useState(""); // name -> searchMedicine
    const [name2, setName2] = useState("");
    const [description, setDescription] = useState("");
    const [manufacturer, SETMANUFACTURER] = useState("");
    const Searcher = async e => {
        e.preventDefault();
        console.log(name);
        try {
        //const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}`);
        const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}&name2=${name2}&description=${description}&manufacturer=${manufacturer}`);
        const parseResponse = await response.json();
        rowsFetched = parseResponse.length
        //setUsers(parseResponse);
        setMedicines(parseResponse);
        console.log(parseResponse);

        } catch (err) {
        console.error(err.message);
        } 
    };
    //

    // DELETE FUNCTION
    const deleteMedicine = async (MEDICINE_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/medicines/${MEDICINE_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setMedicines(prevTodos => prevTodos.filter(todo => todo.MEDICINE_ID !== MEDICINE_ID));
            } else {
                console.log(`Error deleting MEDICINE with ID ${MEDICINE_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMedicines = async() => {
        try {
            const response = await fetch("http://localhost:5000/medicines"); // by default, fetch makes a get request
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
    }, []); // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
    <center>
    <a href = '#list'> <button className="btn-primary">View Medicines</button>  </a> <br/>
    <p></p>
    <a href = '#form'> <button className="btn-primary">Add a Medicine</button> </a>
    </center>
    
    
    <center><h1 class = "mt-5" id="list"> SEARCH FOR A MEDICINE: </h1></center>
    <form onSubmit={Searcher} className="text-center" style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
        <center>
        <label for="name2"> TRADE NAME: </label>
          <input
            type="text"
            name="name2"
            style={{ width: '300px', height: '30px' }}
            placeholder="Enter medicine trade name ..."
            className="form-control"
            value={name2}
            onChange={e => setName2(e.target.value)}
          />
          <label for="name"> GENERIC NAME: </label>
          <input
          type="text"
          name="name"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter medicine generic name ..."
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label for="name"> DESCRIPTION: </label>
          <input
          type="text"
          name="description"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter description ..."
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label for="name"> MANUFACTURER: </label>
          <input
          type="text"
          name="name"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter manufacturer ..."
          className="form-control"
          value={manufacturer}
          onChange={e => SETMANUFACTURER(e.target.value)}
        />
        </center>
        <p></p> <p></p>
          <button className="btn btn-primary">SEARCH</button>
    </form>
    <center>
   {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows ? ("Number of matching results: " + rowsFetched) : ""}
   {rowsFetched === 0 ? "No results matched" : ""}
   </center>

    <center><h1 class = "mt-5" id="list"> LIST OF MEDICINES </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm table-responsive">

    <thead>
      <tr>
        <th>MEDICINE ID</th>
        <th>TRADE NAME</th>
        <th> GENERIC NAME </th>
        <th>STRENGTH</th>
        <th>DESCRIPTION</th>
        <th>MANUFACTURER</th>
        <th>PRICE (TAKA)</th>
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
                 {todo.MEDICINE_ID}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.TRADE_NAME}  </td>
            <td> {todo.GENERIC_NAME}  </td>
            <td> {todo.STRENGTH}  </td>
            <td> {todo.DESCRIPTION}  </td>
            <td> {todo.MANUFACTURER}  </td>
            <td> {todo.PRICE}  </td>
            <td> <EditMedicine todo={todo} /> </td>
            <td> 
                <button className="btn btn-danger" onClick={() => deleteMedicine(todo.MEDICINE_ID)}>
                 Delete </button> 
            </td>
        </tr>
    ))}

    </tbody>
    </table>
    <p id="form"> </p>
    <InputMedicine />
    </Fragment>
    )
}

export default ListofMedicines;