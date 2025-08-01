import React, {Fragment, useEffect, useState, Link} from "react";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofBeds = () => {

    //const [todos, setTodos] = useState([])
    const [doctors, setDoctors] = useState([]);
    const [email, setEmail] = useState('')

    const [numberOfRows, setnumberOfRows] = useState(50);
    const rowsPerLoad = 100;

    const loadMoreRows = () => {
        setnumberOfRows(numberOfRows + rowsPerLoad);
    };

    // DELETE FUNCTION
    const deleteDoctor = async (BED_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/beds/${BED_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setDoctors(prevTodos => prevTodos.filter(todo => todo.BID !== BED_ID));
            } else {
                console.log(`Error deleting room with ID ${BED_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getBeds = async() => {
        setEmail(localStorage.getItem('email'))
        try {
            const response = await fetch("http://localhost:5000/beds"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setDoctors(jsonData); // changing the data
            console.log(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getBeds();
    }, []); // the empty array makes it make only one request

    console.log(doctors);

    return (
    <Fragment>
    <div className="text-center">
    <button className="btn btn-dark">
        <div style={{fontSize: '28px'}}>
        <b> View the currently occupied beds <br />
        and hospitalised patients- </b>
        <a href="http://localhost:3000/bedstaken">here</a>
        </div>
    </button>

    <center><h1 class = "mt-5"> LIST OF UNOCCUPIED/AVAILABLE BEDS </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
        <th>BED ID</th>
        <th>BED NUMBER</th>
        <th> COST PER NIGHT </th>
        <th> ROOM ID </th>
        <th> ROOM NAME</th>
        <th> ROOM TYPE </th>
      </tr>
    </thead>

    <tbody>

    {doctors.slice(0, numberOfRows).map(todo => (
        <tr>
            <td>
                 {todo.BID}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.BNUM}  </td>
            <td> {todo.BCOST}  </td>
            <td> {todo.RID}  </td>
            <td> {todo.RNAME}  </td>
            <td> {todo.RTYPE}  </td>
            {email === 'admin@gmail.com' && <div> <td style={{width: '8%'}}> <button className="btn btn-warning"> Edit </button></td>
            <td style={{width: '8%'}}> 
                <button className="btn btn-danger" onClick={() => deleteDoctor(todo.BID)}>
                 Delete </button> 
            </td> </div>}
        </tr>
    ))}

    </tbody>
    </table>

    <p></p>

    <center>
    {numberOfRows < doctors.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button className="btn btn-warning" onClick={loadMoreRows}>
                                Load More Rows
                            </button>
                        </div>
                        )}
    </center>
    <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
    

    <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
    </div>
    </Fragment>
    )
}

export default ListofBeds;