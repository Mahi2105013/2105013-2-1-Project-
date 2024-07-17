import React, {Fragment, useEffect, useState} from "react";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofRooms = () => {

    //const [todos, setTodos] = useState([])
    const [doctors, setDoctors] = useState([]);
    const [email, setEmail] = useState('')

    // DELETE FUNCTION
    const deleteDoctor = async (DOCTOR_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/rooms/${DOCTOR_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setDoctors(prevTodos => prevTodos.filter(todo => todo.DOCTOR_ID !== DOCTOR_ID));
            } else {
                console.log(`Error deleting room with ID ${DOCTOR_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getRooms = async() => {
        try {
            setEmail(localStorage.getItem('email'))
            const response = await fetch("http://localhost:5000/rooms"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setDoctors(jsonData); // changing the data
            console.log(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getRooms();
    }, []); // the empty array makes it make only one request

    console.log(doctors);

    return (
    <Fragment>
    <div className="text-center">
    <center><h1 class = "mt-5"> LIST OF ROOMS </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
        <th>ROOM ID</th>
        <th>ROOM NAME</th>
        <th> ROOM TYPE </th>
        <th> CAPACITY </th>
      </tr>
    </thead>

    <tbody>

    {doctors.map(todo => (
        <tr>
            <td>
                 {todo.ID}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.NAME}  </td>
            <td> {todo.TYPE}  </td>
            <td > {todo.CAPACITY}  </td>
            {email === 'admin@gmail.com' && <div> <td style={{width: '8%'}}> <button className="btn btn-warning"> Edit </button></td>
            <td style={{width: '8%'}}> 
                <button className="btn btn-danger" onClick={() => deleteDoctor(todo.ID)}>
                 Delete </button> 
            </td> </div>}
        </tr>
    ))}

    </tbody>
    </table>
    </div>
    </Fragment>
    )
}

export default ListofRooms;