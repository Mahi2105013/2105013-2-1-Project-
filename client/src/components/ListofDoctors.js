import React, {Fragment, useEffect, useState} from "react";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofDoctors = () => {

    //const [todos, setTodos] = useState([])
    const [doctors, setDoctors] = useState([]);

    // DELETE FUNCTION
    const deleteDoctor = async (DOCTOR_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/doctors/${DOCTOR_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setDoctors(prevTodos => prevTodos.filter(todo => todo.DOCTOR_ID !== DOCTOR_ID));
            } else {
                console.log(`Error deleting todo with ID ${DOCTOR_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDoctors = async() => {
        try {
            const response = await fetch("http://localhost:5000/doctors"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setDoctors(jsonData); // changing the data
            console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getDoctors();
    }, []); // the empty array makes it make only one request

    console.log(doctors);

    return (
    <Fragment>
            { " " }
    <center><h1 class = "mt-5"> LIST OF DOCTORS</h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
        <th>DOCTOR ID</th>
        <th>FIRST NAME</th>
        <th> LAST NAME </th>
        <th> DEPARTMENT NAME</th>
        <th> SPECIALITY</th>
        <th>CONTACT NUMBER</th>
      </tr>
    </thead>

    <tbody>
      {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
    </tr>*/}

    {doctors.map(todo => (
        <tr key = {todo.DOCTOR_ID}>
            <td>
                 {todo.DOCTOR_ID}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.FIRST_NAME}  </td>
            <td> {todo.LAST_NAME}  </td>
            <td> {todo.DEPARTMENT_NAME}  </td>
            <td> {todo.SPECIALITY}  </td>
            <td> {todo.CONTACT_NO}  </td>
            <td> 
            <button className="btn btn-warning"> Edit </button>
            </td>
            <td> 
                <button className="btn btn-danger" onClick={() => deleteDoctor(todo.DOCTOR_ID)}>
                 Delete </button> 
            </td>
        </tr>
    ))}

    </tbody>
    </table>
    </Fragment>
    )
}

export default ListofDoctors;