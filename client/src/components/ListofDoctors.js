import React, {Fragment, useEffect, useState} from "react";
// use effect -> make a fetch request
//import EditTodo from "./EditTodo";



const ListofDoctors = () => {

    //const [todos, setTodos] = useState([])
    const [doctors, setDoctors] = useState([]);
    const [email, setEmail] = useState("")

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
            setEmail(localStorage.getItem('email'))

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
    
    <div className="container my-5">
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {doctors.map(doctor => (
      <div className="col" key={doctor.DOCTOR_ID}>
        <div className="card h-100 shadow-sm border-0">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title mb-0">
              Dr. {doctor.FIRST_NAME} {doctor.LAST_NAME}
            </h5>
          </div>
          <div className="card-body">
            <div className="d-flex mb-3">
              <div className="me-3">
                <div className="avatar avatar-lg bg-light-primary rounded-circle d-flex align-items-center justify-content-center">
                  <i className="fas fa-user-md fa-lg text-primary"></i>
                </div>
              </div>
              <div>
                <h6 className="text-muted mb-1">Specialty</h6>
                <p className="h5 text-dark">{doctor.SPECIALITY}</p>
                
                <h6 className="text-muted mb-1 mt-2">Department</h6>
                <p className="h6 text-dark">{doctor.DEPARTMENT_NAME}</p>
              </div>
            </div>
            
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-id-card me-2 text-muted"></i>
                  Doctor ID
                </span>
                <span className="badge bg-light text-dark">{doctor.DOCTOR_ID}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-phone me-2 text-muted"></i>
                  Contact
                </span>
                <span className="text-primary">{doctor.CONTACT_NO}</span>
              </li>
            </ul>
          </div>
          
          {email === 'admin@gmail.com' && (
            <div className="card-footer bg-transparent d-flex justify-content-between">
              <button 
                className="btn btn-sm btn-outline-warning"
                onClick={() => {/* Edit function here */}}
              >
                <i className="fas fa-edit me-1"></i> Edit
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => deleteDoctor(doctor.DOCTOR_ID)}
              >
                <i className="fas fa-trash me-1"></i> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
    </Fragment>
    )
}

export default ListofDoctors;