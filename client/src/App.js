import React, { Fragment, useState, useEffect } from "react";
import './App.css';
//import InputTodo from "./components/inputTodo";
//import ListTodos from "./components/ListTodos";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import ListofPatients from './components/ListofPatients';
import InputPatient from './components/InputPatient';
import ListofDoctors from './components/ListofDoctors';
import ListofMedicines from "./components/ListofMedicines";
import ListofMedicinesTaken from "./components/ListofMedicinesTaken";
import InputMedicine from "./components/InputMedicine";
//import Dashboard from "./components/AdmDummy";
import ListofMedicinesTaken2 from "./components/ListofMedicinesTaken2";
import ListofMedicinesTaken3 from "./components/ListofMedicinesTaken3";
import ListofMedicinesTaken4 from "./components/ListofMedicinesTaken4";
import ListofRooms from "./components/ListofRooms";
import ListofBeds from "./components/ListofBeds";
import Login from "./components/Login";
import Register from "./components/Register";
//import Dashboard from "./components/Dashboard";
//import Dashboard from "./components/Dashboard"
//import DashboardforHomePage from "./components/DashboardforHomePage";
import TopSellingMedicines from "./components/Dashboard/TopSellingMedicines";
import ListofTests from "./components/ListofTests";
import ListofPatients2 from "./components/ListofPatients2";
import TopSellingMedicinesMonth from "./components/Dashboard/TopSellingMedicinesMonth";
import AdmissionsCountMonthly from "./components/Dashboard/AdmissionsCountMonthly";
import AdmissionCountYearly from "./components/Dashboard/AdmissionsCountYearly";
import ListofTestsTaken from "./components/ListofTestsTaken";
import AdmissionAgeGrouping from "./components/Dashboard/AdmissionAgeGrouping";
import MedicineWiseAnalysis from "./components/Dashboard/MedicineWiseAnalysis";
import EveryDayBilling from "./components/Dashboard/EveryDayBilling";
import DiseaseGrouping from "./components/Dashboard/DiseaseGrouping";
import Billing from "./components/Billing";
import ListofBedsTaken2 from "./components/ListofBedsTaken2";
import ListofBedsTakenList from "./components/ListofBedsTaken";
import PatientWiseAnalysis from "./components/Dashboard/PatientWiseAnalysis";
import TopSellingTestsYear from "./components/Dashboard/TopSellingTests";
import TopSellingTestsMonth from "./components/Dashboard/TopSellingTestsMonth";

   
   // Define page components directly within App.js
   //const HomePage = () => <div>  Hello! Home Page! </div>;
   const HomePage = () => {
    const style = {
        backgroundColor: 'black',
        color: 'white',
        //align-items: 'center',
        padding: '20px', // Add any other styling properties as needed
    };

    const style2 = {
      body: {
        margin: 0,
        padding: 0,
        //backgroundImage: 'url(C:\Users\tasni\OneDrive\Desktop\todo\client\src\hospitalpic3.jpg)',
        backgroundImage: `url(${process.env.PUBLIC_URL}/hospitalpic3.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        //filter: 'blur(5px)',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        //background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        zIndex: -1,
      },
      welcomeMessage: {
        color: 'white',
        background: '#333',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)', // Add text shadow
        zIndex: 1,
      },
      heading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
      },
      paragraph: {
        fontSize: '1.5rem',
      },
    };
    
    // You would still need to create the HTML elements and apply these styles dynamically in your JavaScript code.

    return (   
      <div className="text-center" style = {{backgroundImage: `url('/hospitalpic3.jpg')`}}>
        <h1 className="text-center">Welcome to Hospital Management System</h1>
        <p className="text-left">
          At our core, we prioritize the health and well-being of our patients, staff, and community. With cutting-edge technology and a compassionate approach, we strive to provide seamless healthcare management solutions. From patient records to staff coordination, inventory management to streamlined operations, our system empowers healthcare professionals to deliver optimal care. Together, we embark on a journey of innovation and collaboration, ensuring that every aspect of healthcare administration is handled with precision and care. Trust in us as your reliable partner in healthcare management, where every action is driven by our commitment to excellence.
        </p>
        {/* <a href = '#admissionsmonthly'> COUNT OF ADMISSIONS (MONTHLY) </a> <br/>
        <a href = '#admissionsyearly'> COUNT OF ADMISSIONS (YEARLY) </a> <br/>
        <a href = '#agegrouping'> GROUPING OF PATIENTS BASED ON AGE </a> <br/>
        <a href = '#topsellingmedicinesyearly'> TOP SELLING MEDICINES (YEARLY) </a> <br/>
        <a href = '#topsellingmedicinesmonthly'> TOP SELLING MEDICINES (MONTHLY) </a> <br/> */}
        <p> </p> <p> </p>
        <div id = "admissionsmonthly"></div>
        <AdmissionsCountMonthly />
        <div id = "admissionsyearly"></div>
        <AdmissionCountYearly />
        <DiseaseGrouping />
        <div id = "agegrouping"></div>
        <AdmissionAgeGrouping />
        <div id = "topsellingmedicinesyearly"></div>
        <TopSellingMedicines />
        <div id = "topsellingmedicinesmonthly"></div>
        <TopSellingMedicinesMonth />
        
        <TopSellingTestsYear />
        <TopSellingTestsMonth />
        
      </div>     
    );
  };
   const AboutPage = () => <div>This is the About Page.</div>;
   const ContactPage = () => <div>Contact us here!</div>;
   

   
  

   function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
      const isAuthenticated2 =localStorage.getItem('isLoggedIn');
      if(isAuthenticated2)
      {
        setIsLoggedIn(true);
      }
    }, [])

    const renderp = () => {
      if('/')
      {
        return null;
      }

      return <p className="text-center"> YOU HAVEN'T LOGGED IN YET! </p>
    }

    return (
      <Router>

          {/* <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div class="container">
          <a href="#" class="navbar-brand"></a>
          <ul class="navbar-nav">
          <li class="nav-item">
          <Link to="/home" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Home&nbsp;&nbsp; </Link>
          </li>
          <li class="nav-item">
          <Link to="/doctors" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Doctors&nbsp;&nbsp; </Link>
          </li>
          <li class="nav-item">
          <Link to="/medicines" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Medicines&nbsp;&nbsp; </Link>
          </li>
          <li class="nav-item">
          <Link to="/tests" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Tests&nbsp;&nbsp; </Link>
          </li>
          <li class="nav-item">
          <Link to="/rooms" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Rooms&nbsp;&nbsp; </Link>
          </li>
          <li class="nav-item">
          <Link to="/beds" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Beds&nbsp;&nbsp; </Link>
          </li>
          </ul>
          <div class="navbar-text"> </div>
          </div>
          </nav>


        <div>
           
       <nav class="navbar navbar-inverse">
          <div class="container-fluid">
          <div class="navbar-header">
          <button type="button" class="navbar-toggle btn-lg" data-toggle="collapse" data-target="#myNavbar">
          HISTORY
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          </button>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
          <ul class = "flex-row">
               <li>
                 <Link to="/patients">Admission History</Link>
               </li>
               <li>
                 <Link to="/register">Register a new patient</Link>
               </li>
               <li>
                 <Link to="/teststaken">History of Tests Taken</Link>
               </li>
               <li>
                 <Link to="/medicinestaken">History of Medicines Taken</Link>
               </li>
             </ul>
          </div>
        </div>
      </nav>
   */}
          {/* <div> */}
          <div style = {{backgroundImage: `url('/hospitalpic3.jpg')`}} >
          {isLoggedIn ? <NavigationBar /> : <p></p>}
          {!isLoggedIn ? renderp() : <p></p>}
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Login6 />} />
            {isLoggedIn && (
            <>
            {/* <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />
                }
              />
            */}
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/doctors" />} />
            <Route path="/patients" element={<ListofPatients />} />
            <Route path="/patients2" element={<ListofPatients2 />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/patientwiseanalysis" element={<PatientWiseAnalysis />} />
            <Route path="/dayendrevenue" element={<EveryDayBilling />} />
            <Route path="/register" element={<InputPatient />} />
            <Route path="/doctors" element={<ListofDoctors />} />
            <Route path="/tests" element={<ListofTests />} />
            {/*<Route path="/teststaken" element={<Listofteststaken />} />*/}
            <Route path="/medicines" element={<ListofMedicines />} />
            <Route path="/medicinestaken" element={<ListofMedicinesTaken />} />
            <Route path="/medicinestaken2" element={<ListofMedicinesTaken2 />} />
            <Route path="/medicinestaken3" element={<ListofMedicinesTaken3 />} />
            <Route path="/medicinestaken4" element={<ListofMedicinesTaken4 />} />
            <Route path="/teststaken" element={<ListofTestsTaken />} />
            <Route path="/bedstaken" element={<ListofBedsTakenList />} />
            <Route path="/bedstaken2" element={<ListofBedsTaken2 />} />
            <Route path="/rooms" element={<ListofRooms />} />
            <Route path="/beds" element={<ListofBeds />} />
            <Route path = "/registeraccount" element={<Register />}/>
            </>
            )}

          </Routes>
        </div>
      </Router>
    );
  }
  


  const NavigationBar = () => {
    const location = useLocation();
    if(location.pathname === '/login')
    {
      return null;
    }

    if(location.pathname === '/')
    {
      return null;
    }

    const LoggingOut = () => {
      localStorage.removeItem('isLoggedIn');
    }

    return (
      <div style = {{backgroundImage: `url('/hospitalpic2.jpg')`}} >
      <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
      <a href="#" class="navbar-brand"></a>
      <ul class="navbar-nav">
      <li class="nav-item">
      <Link to="/home" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Home&nbsp;&nbsp; </Link>
      </li>
      <li class="nav-item">
      <Link to="/doctors" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Doctors&nbsp;&nbsp; </Link>
      </li>
      <li class="nav-item">
      <Link to="/medicines" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Medicines&nbsp;&nbsp; </Link>
      </li>
      <li class="nav-item">
      <Link to="/tests" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Tests&nbsp;&nbsp; </Link>
      </li>
      <li class="nav-item">
      <Link to="/rooms" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Rooms&nbsp;&nbsp; </Link>
      </li>
      <li class="nav-item">
      <Link to="/beds" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Beds&nbsp;&nbsp; </Link>
      </li>
      </ul>
      <div class="navbar-text"> <Link to="/"> <button className="btn btn-danger" onClick={LoggingOut}> Logout </button> </Link> </div>
      </div>
      </nav>


    {/*<div>*/}
       
   <nav class="navbar navbar-inverse">
      <div class="container-fluid">
      <div class="navbar-header">
      <button type="button" class="navbar-toggle btn-lg" data-toggle="collapse" data-target="#myNavbar">
      HISTORY
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      </button>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
      <ul class = "flex-row">
           <li>
             <Link to="/patients">Admission History</Link>
           </li>
           <li>
             <Link to="/billing">Billing Records</Link>
           </li>
           <li>
             <Link to="/patientwiseanalysis">Patient Wise Analysis</Link>
           </li>
           <li>
             <Link to="/dayendrevenue">Day End Revenue</Link>
           </li>
           <li>
             <Link to="/register">Register a new patient</Link>
           </li>
           <li>
             <Link to="/teststaken">History of Tests Taken</Link>
           </li>
           <li>
             <Link to="/medicinestaken">History of Medicines Taken</Link>
           </li>
           <li>
             <Link to="/bedstaken">History of Beds Taken</Link>
           </li>
         </ul>
      </div>
    </div>
  </nav>
  </div>
    );
  }


   function App2() {
     return (
       <Router>
         <div>
            {/*Navigation links*/}
           <nav class = "navbar navbar-inverse">
             <ul>
               <li>
                 <Link to="/">Home</Link>
               </li>
               <li>
                 <Link to="/patients">Admission History</Link>
               </li>
               <li>
                 <Link to="/register">Register a new patient</Link>
               </li>
               <li>
                 <Link to="/doctors">Doctor List</Link>
               </li>
               <li>
                 <Link to="/medicines">Medicines</Link>
               </li>
               <li>
                 <Link to="/medicinestaken">Medicines Taken</Link>
               </li>
             </ul>
           </nav>
   
           {/* Route definitions */}
           <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/patients" element={<ListofPatients />} />
             <Route path="/register" element={<InputPatient />} />
             <Route path="/doctors" element={<ListofDoctors />} />
             <Route path="/medicines" element={<ListofMedicines />} />
             <Route path="/medicinestaken" element={<ListofMedicinesTaken />} />
           </Routes>
         </div>
       </Router>
     );
   }
   
   export default App;
  



   /*
   import React, { Fragment } from 'react';
import './App.css';

// We suggest that you begin by typing:

//   cd client
//   npm start

// Happy hacking!



// components
import InputTodo from './components/inputTodo';
import ListTodos from './components/ListTodos';
import ListofPatients from './components/ListofPatients';
import InputPatient from './components/InputPatient';
import ListofDoctors from './components/ListofDoctors';
function App() {
  return ( // returning jsx, not html. Also function name starts with a capital letter. This is
  // called component which is a breakdown of individual parts of an application.
  <Fragment>
  <div className="background-image">
  <div className="overlay">
  <div className="container">
    

    <ListofPatients />
    <InputPatient />
  </div>
  </div>
  </div>
  </Fragment>
  
  );
}

export default App;

   */



const Login6 = ({ setLoginTrue }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/loggingin");

      const parseRes = await response.json();
      
      let x = false
      parseRes.forEach(element => {
        console.log(element.USER_EMAIL)
        console.log(email)

        console.log(element.USER_PASSWORD)
        console.log(password)

        if(element.USER_EMAIL === email && element.USER_PASSWORD === password)
        {
          //setAuth(true);
          //setLoginTrue();
          x = true
          localStorage.setItem('isLoggedIn', true);
          console.log("yep");
          window.location = "/home"
          //alert("Invalid email or password");
          //return;
        }
        
        // else
        // {
        //   alert("Incorrect username and password")
        //   console.log("nope, doesnt match")
        // }
        //else {window.location = "/doctors";}
      });

      if(!x) {
        alert("Incorrect username and password")
          console.log("nope, doesnt match")
      }
        
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div style = {{backgroundColor: 'white'}} >
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <center>
        <div className="d-flex">
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-1"
          style={{width: '700px'}}
          //className="form-control"
        />
        </div>
        <div className="d-flex">
          <p> </p> <p> </p> <p> </p> <p> </p>  <p> </p> <p> </p> 
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-1"
          style={{width: '700px'}}
          //className="form-control"
        />
        </div>
        <p> </p> <p> </p>
        <button class="btn btn-success">Submit</button>
        </center>
      </form>
      <center>
      <Link to="/registeraccount">Don't have an account? Register</Link>
      </center>
    </div>  
    </Fragment>
  );
};
