import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import MedicineWiseAnalysis from "./Dashboard/MedicineWiseAnalysis";
import InputMedicineTaken from "./InputMedicineTaken";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofMedicinesTaken = () => {

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
            const response = await fetch("http://localhost:5000/medicinestaken"); // by default, fetch makes a get request
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
            console.log(jsonData)
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
    <div className="text-center">
    <MedicineWiseAnalysis/>
    </div>
    <p> </p>
    <p> </p>
    <InputMedicineTaken />
    <p> </p>
    <p> </p>

    <Link to = "http://localhost:3000/medicinestaken2">
       <center> <button class="btn-success"> Next Page: <br />
       View History of Medicines Taken </button> </center>
    </Link>
    <p></p>
    <p></p>
    </Fragment>
    )
}

export default ListofMedicinesTaken;