import React, {Fragment, useEffect, useState, useRef} from "react";
//import { set } from "../../../../server/testshelper";
let rowsFetched = -1;
let totalRows = 0;

const PatientWiseAnalysis = () => {

    //const [todos, setTodos] = useState([])
    const [patient, setpatient] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [tests, settests] = useState([]);
    const [beds, setbeds] = useState([]);
    //
    const [id, setid] = useState(14);

    useEffect(() => {
        //getMedicines();
        Searcher();
    }, []);

    const Searcher = async e => {
        if (e) {
            e.preventDefault(); // Check if the event object exists before calling preventDefault
        }
        
        try {
        //const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}`);
        const response = await fetch(`http://localhost:5000/patientinfo/?id=${id}`);
        const parseResponse = await response.json();
        setpatient(parseResponse);
        
        const response2 = await fetch(`http://localhost:5000/medicineinfo/?id=${id}`);
        const parseResponse2 = await response2.json();
        setMedicines(parseResponse2);

        const response3 = await fetch(`http://localhost:5000/testinfo/?id=${id}`);
        const parseResponse3 = await response3.json();
        settests(parseResponse3);

        const response4 = await fetch(`http://localhost:5000/bedinfo/?id=${id}`);
        const parseResponse4 = await response4.json();
        setbeds(parseResponse4);

        console.log(patient)
        console.log(medicines)
        console.log(tests)
        console.log(beds)
        } catch (err) {
        console.error(err.message);
        } 
    };

    // const getMedicines = async() => {
    //     try {
    //         const response = await fetch("http://localhost:5000/PatientWiseAnalysisall"); // by default, fetch makes a get request
    //         // we will get json data back
    //         const jsonData = await response.json();
    //         totalRows = jsonData.length

    //         setMedicines(jsonData); // changing the data
            
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

     // the empty array makes it make only one request

    //console.log(doctors);

    return (
    <Fragment>
    <div className="text-center">
    <center><h1 class = "mt-5" id="list"> SEARCH FOR INFORMATION OF AN ADMISSION ID: </h1></center>
    <form onSubmit={Searcher} className="text-center" style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
        <center>
          <label for="name"> ADMISSION_ID: </label>
          <input
          type="text"
          name="name"
          style={{ width: '300px', height: '30px' }}
          placeholder="Enter ADMISSION ID ..."
          className="form-control"
          value={id}
          onChange={e => setid(e.target.value)}
        />
        </center>
        <p></p> <p></p>
          <button className="btn btn-primary">SEARCH</button>
    </form>
    <center>
   {/* {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows ? ("Number of matching results: " + rowsFetched) : ""}
   {rowsFetched === 0 ? "No results matched" : ""} */}
   </center>

    <center><h1 class = "mt-5" id="list"> PATIENT INFORMATION </h1></center>
    
    <table class="table table-bordered table-responsive table-dark table-striped table-sm">
    <tbody>
            <tr>
                <td>ADMISSION ID</td>
                <td>ADMISSION DATE</td>
                <td>DISCHARGE_DATE</td> 
                <td>PATIENT ID</td>
                <td>FIRST_NAME</td>
                <td>LAST_NAME</td>
                <td>EMAIL</td>
                <td>GENDER</td>
                <td>CONTACT_NO</td>
                <td>ADDRESS</td>
                <td>CITY</td>
                <td>DATE_OF_BIRTH</td>
                <td>DISEASE</td>
            </tr>
            {patient.map(todo => (
                <tr key={todo.ADMISSION_ID}>
                    <td>{todo.ADMISSION_ID}</td> 
                    <td>{todo.DATE_OF_ADMISSION}</td>
                    <td>{todo.DISCHARGE_DATE}</td>
                    <td>{todo.PATIENT_ID}</td>
                    <td>{todo.FIRST_NAME}</td>
                    <td>{todo.LAST_NAME}</td>
                    <td>{todo.EMAIL}</td>
                    <td>{todo.GENDER}</td>
                    <td>{todo.CONTACT_NO}</td>
                    <td>{todo.ADDRESS}</td>
                    <td>{todo.CITY}</td>
                    <td>{todo.DATE_OF_BIRTH}</td>
                    <td>{todo.DISEASE}</td>
                </tr>
            ))}
    </tbody>
    </table>


    <h1>PURCHASED MEDICINES</h1>
    <table class="table table-bordered  table-dark table-striped table-sm">
    <tbody>
            <tr>
                <td>MEDICINE TAKEN ID</td>
                <td>MEDICINE ID</td>
                <td>TRADE NAME</td>
                <td>GENERIC NAME</td>
                <td>STRENGTH</td>
                <td>QUANTITY</td> 
                <td>TAKEN DATE</td>
                <td>UNIT COST</td>
                <td>TOTAL PRICE</td>
            </tr>
            {medicines.map(todo => (
                <tr key={todo.MEDICINE_TAKEN_ID}>
                    <td>{todo.MEDICINE_TAKEN_ID}</td>
                    <td>{todo.MEDICINE_ID}</td> 
                    <td>{todo.TRADE_NAME}</td>
                    <td>{todo.GENERIC_NAME}</td>
                    <td>{todo.STRENGTH}</td>
                    <td>{todo.QUANTITY}</td>
                    {/* <td>{todo.TAKEN_DATE}</td> */}
                    <td>{new Date(todo.TAKEN_DATE).toISOString().split('T')[0]}</td>

                    <td>{todo.UNIT_COST}</td>
                    <td>{todo.TOTAL}</td>
                </tr>
            ))}

    </tbody>
    </table>



    <h1>TESTS DONE</h1>
    <table class="table table-bordered table-dark table-striped table-sm">
    <tbody>
            <tr>
                <td>TEST TAKEN ID</td>
                <td>TEST ID</td>
                <td> TEST NAME </td>
                <td> TAKEN DATE</td>
                <td> COST </td>
            </tr>
            {tests.map(todo => (
                <tr key={todo.TEST_TAKEN_ID}>
                    <td>{todo.TEST_TAKEN_ID}</td>
                    <td>{todo.TEST_ID}</td>
                    <td>{todo.TYPE}</td> 
                    {/* <td>{todo.TAKEN_DATE}</td> */}
                    {/* <td>{todo.TAKEN_DATE}</td> */}
                    <td>{new Date(todo.TAKEN_DATE).toISOString().split('T')[0]}</td>

                    <td>{todo.COST}</td>
                </tr>
            ))}
            

    </tbody>
    </table>
    <h5><a href="http://localhost:3000/teststaken" > View Test Reports Here </a></h5>




    <h1> BEDS TAKEN </h1>
    <table class="table table-bordered table-dark table-striped table-sm">
    <tbody>
            <tr>
                <td>BED TAKEN ID</td>
                <td>BED ID</td>
                <td>BED NUMBER</td>
                <td>ROOM NAME</td>
                <td>ROOM TYPE</td>
                <td> START DATE </td>
                <td> END DATE</td>
                <td> COST PER NIGHT </td>
                <td> NUMBER OF NIGHTS STAYED </td>
                <td> TOTAL COST</td>
            </tr>
            {beds.map(todo => (
                <tr key={todo.TEST_TAKEN_ID}>
                    <td>{todo.BED_TAKEN_ID}</td>
                    <td>{todo.BED_ID}</td>
                    <td>{todo.BED_NUMBER}</td> 
                    <td>{todo.ROOM_NAME}</td> 
                    <td>{todo.ROOM_TYPE}</td> 
                    {/* <td>{todo.TAKEN_DATE}</td> */}
                    {/* <td>{todo.TAKEN_DATE}</td> */}
                    <td>{new Date(todo.START_DATE).toISOString().split('T')[0]}</td>
                    <td>{new Date(todo.END_DATE).toISOString().split('T')[0]}</td>
                    <td>{todo.COST_PER_NIGHT}</td>
                    <td>{todo.NUMBER_OF_NIGHTS_STAYED}</td>
                    <td>{todo.COST_PER_NIGHT*todo.NUMBER_OF_NIGHTS_STAYED}</td>
                </tr>
            ))}
            

    </tbody>
    </table>


    <p id="form"> </p>
    </div>
    </Fragment>
    )
}

export default PatientWiseAnalysis;