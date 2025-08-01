import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DischargeForm from "./Bed Management/DischargeForm";
import ChangeBedForm from "./Bed Management/ChangeBedForm";

const ListofBedsTakenList = () => {
    const [beds, setBeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const searchBeds = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/bedstakenoccsearch/?name=${searchTerm}`);
            const data = await response.json();
            setBeds(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchBeds = async () => {
        setIsLoading(true);
        try {
            setEmail(localStorage.getItem('email'));
            const response = await fetch("http://localhost:5000/bedstakenocc");
            const data = await response.json();
            setBeds(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBeds();
    }, []);

    if (email !== 'admin@gmail.com') {
        return (
            <div className="container text-center py-5">
                <div className="card shadow-lg border-danger">
                    <div className="card-body py-5">
                        <h1 className="text-danger mb-4">
                            <i className="bi bi-exclamation-octagon-fill me-2"></i>
                            Access Denied
                        </h1>
                        <p className="lead">
                            You are not authorized to view this information.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            {/* Header and Navigation */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h1 className="h4 mb-0">
                        <i className="bi bi-hospital me-2"></i>
                        Hospital Bed Occupancy Management
                    </h1>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-4">
                        <Link to="/bedstaken2" className="btn btn-success btn-lg">
                            <i className="bi bi-clock-history me-2"></i>
                            View Full Bed History
                        </Link>
                    </div>

                    {/* Search Section */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-light">
                            <h2 className="h5 mb-0">
                                <i className="bi bi-search me-2"></i>
                                Search Hospitalized Patients
                            </h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={searchBeds} className="row g-3">
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter patient name..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-lg w-100" type="submit">
                                        <i className="bi bi-search me-2"></i>
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Bed Cards */}
                    <div className="mb-4">
                        <h2 className="h4 mb-3">
                            <i className="bi bi-bed me-2"></i>
                            Currently Occupied Beds
                        </h2>
                        
                        {isLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            // <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            <div className="row g-4">

                                {beds.map(bed => (
                                    <div className="col-12 col-md-6 col-lg-4" key={bed.BED_TAKEN_ID}>
                                        <div className="card h-100 shadow-sm border-start border-4 border-primary">
                                            <div className="card-header bg-light">
                                                <h3 className="h6 mb-0">
                                                    Bed #{bed.BED_NUMBER} - {bed.ROOM_NAME}
                                                </h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <h4 className="h5 text-primary">{bed.PATIENT_NAME}</h4>
                                                    <p className="mb-1">
                                                        <strong>Admission ID:</strong> {bed.ADMISSION_ID}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Diagnosis:</strong> {bed.DISEASE}
                                                    </p>
                                                </div>
                                                
                                                <div className="border-top pt-2">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p className="mb-1">
                                                                <strong>Room Type:</strong>
                                                            </p>
                                                            <span className="badge bg-info">{bed.ROOM_TYPE}</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-1">
                                                                <strong>Bed ID:</strong>
                                                            </p>
                                                            <span className="badge bg-secondary">{bed.BED_ID}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="border-top pt-2 mt-2">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p className="mb-1">
                                                                <strong>Admitted:</strong> {bed.S}
                                                            </p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-1">
                                                                <strong>Nights Stayed:</strong> {bed.NUMBER_OF_NIGHTS_STAYED}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="mb-0">
                                                        <strong>Cost/Night:</strong> ${bed.COST_PER_NIGHT}
                                                    </p>
                                                    <p>
                                                        <td style={{width: '8%'}}> 
                                                            <button className="btn btn-warning">
                                                                             Change bed </button> 
                                                        </td>
                                                    </p>

                                                    <p>
                                                        <td style={{width: '8%'}}> 
                                                            <button className="btn btn-danger">
                                                                             Discharge patient </button> 
                                                        </td>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="card-footer bg-transparent">
                                                <small className="text-muted">
                                                    Bed Taken ID: {bed.BED_TAKEN_ID}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Management Forms */}
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-header bg-warning text-dark">
                                    <h3 className="h5 mb-0">
                                        <i className="bi bi-file-medical me-2"></i>
                                        Discharge Patient
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <DischargeForm />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-header bg-info text-white">
                                    <h3 className="h5 mb-0">
                                        <i className="bi bi-arrow-left-right me-2"></i>
                                        Transfer Patient
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ChangeBedForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListofBedsTakenList;