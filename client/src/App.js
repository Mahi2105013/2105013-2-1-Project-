import React, { Fragment, useState, useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHospital, faHeartbeat, faCalendarWeek, 
  faCalendarAlt, faUsers, faDisease, 
  faPills, faCapsules, faFlask, faVial 
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import ListofPatients from './components/ListofPatients';
import InputPatient from './components/InputPatient';
import ListofDoctors from './components/ListofDoctors';
import ListofMedicines from "./components/ListofMedicines";
import ListofMedicinesTaken from "./components/ListofMedicinesTaken";
import InputMedicine from "./components/InputMedicine";
import ListofMedicinesTaken2 from "./components/ListofMedicinesTaken2";
import ListofMedicinesTaken3 from "./components/ListofMedicinesTaken3";
import ListofMedicinesTaken4 from "./components/ListofMedicinesTaken4";
import ListofRooms from "./components/ListofRooms";
import ListofBeds from "./components/ListofBeds";
import Login from "./components/Login";
import Register from "./components/Register";
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

// Initialize Font Awesome library
library.add(faHospital, faHeartbeat, faCalendarWeek, faCalendarAlt, 
            faUsers, faDisease, faPills, faCapsules, faFlask, faVial);


   
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
    

    return (
  <div className="welcome-page" style={{ 
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/hospitalpic3.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '2rem 0'
  }}>
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section text-center mb-5 p-4 rounded-3" style={{
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderLeft: '5px solid #0d6efd'
      }}>
        <h1 className="display-4 fw-bold text-primary mb-3">
          <i className="fas fa-hospital me-2"></i>
          Welcome to Hospital Management System
        </h1>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="lead text-muted text-center" style={{
              lineHeight: '1.8',
              fontSize: '1.1rem'
            }}>
              At our core, we prioritize the health and well-being of our patients, staff, and community. 
              With cutting-edge technology and a compassionate approach, we strive to provide seamless 
              healthcare management solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mission-card card shadow-sm mb-5 border-0">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-2 text-center">
              <i className="fas fa-heartbeat text-danger" style={{ fontSize: '3rem' }}></i>
            </div>
            <div className="col-md-10">
              <p className="mb-0" style={{
                fontSize: '1.05rem',
                lineHeight: '1.8'
              }}>
                From patient records to staff coordination, inventory management to streamlined operations, 
                our system empowers healthcare professionals to deliver optimal care. Together, we embark 
                on a journey of innovation and collaboration, ensuring that every aspect of healthcare 
                administration is handled with precision and care. Trust in us as your reliable partner 
                in healthcare management, where every action is driven by our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Components */}
      <div className="dashboard-components">
        {/* Analytics Row 1 */}
        <div className="row mb-4 g-4">
          <div className="col-lg-6" id="admissionsmonthly">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <i className="fas fa-calendar-week me-2"></i>
                  Monthly Admissions
                </h3>
              </div>
              <div className="card-body">
                <AdmissionsCountMonthly />
              </div>
            </div>
          </div>
          <div className="col-lg-6" id="admissionsyearly">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white">
                <h3 className="h5 mb-0">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Yearly Admissions
                </h3>
              </div>
              <div className="card-body">
                <AdmissionCountYearly />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Row 2 */}
        <div className="row mb-4 g-4">
          <div className="col-lg-6" id="agegrouping">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-info text-white">
                <h3 className="h5 mb-0">
                  <i className="fas fa-users me-2"></i>
                  Age Group Analysis
                </h3>
              </div>
              <div className="card-body">
                <AdmissionAgeGrouping />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-warning text-dark">
                <h3 className="h5 mb-0">
                  <i className="fas fa-disease me-2"></i>
                  Disease Grouping
                </h3>
              </div>
              <div className="card-body">
                <DiseaseGrouping />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Row 3 */}
        <div className="row mb-4 g-4">
          <div className="col-lg-6" id="topsellingmedicinesyearly">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-danger text-white">
                <h3 className="h5 mb-0">
                  <i className="fas fa-pills me-2"></i>
                  Top Selling Medicines (Yearly)
                </h3>
              </div>
              <div className="card-body">
                <TopSellingMedicines />
              </div>
            </div>
          </div>
          <div className="col-lg-6" id="topsellingmedicinesmonthly">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-purple text-white" style={{ backgroundColor: '#6f42c1' }}>
                <h3 className="h5 mb-0">
                  <i className="fas fa-capsules me-2"></i>
                  Top Selling Medicines (Monthly)
                </h3>
              </div>
              <div className="card-body">
                <TopSellingMedicinesMonth />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Row 4 */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-teal text-white" style={{ backgroundColor: '#20c997' }}>
                <h3 className="h5 mb-0">
                  <i className="fas fa-flask me-2"></i>
                  Top Selling Tests (Yearly)
                </h3>
              </div>
              <div className="card-body">
                <TopSellingTestsYear />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-indigo text-white" style={{ backgroundColor: '#6610f2' }}>
                <h3 className="h5 mb-0">
                  <i className="fas fa-vial me-2"></i>
                  Top Selling Tests (Monthly)
                </h3>
              </div>
              <div className="card-body">
                <TopSellingTestsMonth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    const email = localStorage.getItem('email')

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


       
   {email === 'admin@gmail.com' && <nav class="navbar navbar-inverse">
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
             <Link to="/bedstaken">List of Currenly Hospitalised Patients</Link>
           </li>
         </ul>
      </div>
    </div>
  </nav>}
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
  




const Login6 = ({ setLoginTrue }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [isAdmin, setIsAdmin] = useState(false)

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
          if(isAdmin && email === 'admin@gmail.com') x = true;
          else if(!isAdmin && email !== 'admin@gmail.com') x = true;

          if (x) {
            localStorage.setItem('isLoggedIn', true);
            console.log("yep");
            window.location = "/home"
            localStorage.setItem('username_currently_logged_in', element.USER_NAME);
            localStorage.setItem('userid_currently_logged_in', element.USER_ID);
            localStorage.setItem('useremail_currently_logged_in', element.USER_EMAIL);
            localStorage.setItem('email', element.USER_EMAIL);
          }
          
          // to get the locally stored username: 
          /*
            // Get the value from localStorage
          const storedUsername = localStorage.getItem('username');
          console.log(storedUsername); // Output: 'JohnDoe'

          */
        }
        
        else
        {
          console.log('no! incorrect in this looP!')
        }
        //else {window.location = "/doctors";}
      });

      if (!x) {
        alert("Incorrect username and password")
        console.log("nope, doesnt match")
      }
        
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setIsAdmin(selectedValue === 'option1');
    if(selectedValue === 'option2') setIsAdmin(false)
  };

  return (
    <Fragment>
      <div style = {{backgroundColor: "white"}}>
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
        
        <div>
          Login As: &nbsp;
          <select onChange={handleChange} defaultValue="">
            <option value="" disabled>Select role</option>
            <option value="option1">Admin</option>
            <option value="option2">User</option>
          </select>
        </div>
        <p> </p> <p></p>
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
