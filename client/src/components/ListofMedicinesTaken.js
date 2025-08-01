import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MedicineWiseAnalysis from "./Dashboard/MedicineWiseAnalysis";
import InputMedicineTaken from "./InputMedicineTaken";

const ListofMedicinesTaken = () => {
    const [medicines, setMedicines] = useState([]);
    const [medicinestakenbill, setMedicinestakenbill] = useState([]);
    const [medicinestakencount, setMedicinestakencount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [medsResponse, billResponse, countResponse] = await Promise.all([
                fetch("http://localhost:5000/medicinestaken"),
                fetch("http://localhost:5000/medicinestakenbill"),
                fetch("http://localhost:5000/medicinestakencount")
            ]);

            const [medsData, billData, countData] = await Promise.all([
                medsResponse.json(),
                billResponse.json(),
                countResponse.json()
            ]);

            setMedicines(medsData);
            setMedicinestakenbill(billData);
            setMedicinestakencount(countData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid py-4">
            {/* Header Section */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="h4 mb-0">Medicines Administration Records</h2>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Analytics Section */}
                            <div className="row mb-4">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-header bg-info text-white">
                                            <h3 className="h6 mb-0">Medicine Analysis</h3>
                                        </div>
                                        <div className="card-body">
                                            <MedicineWiseAnalysis />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add Medicine Form */}
                            <div className="card shadow mb-4">
                                <div className="card-header bg-warning text-dark">
                                    <h3 className="h6 mb-0">Record New Medicine Administration</h3>
                                </div>
                                <div className="card-body">
                                    <InputMedicineTaken />
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="text-center mt-4">
                                <Link 
                                    to="/medicinestaken2" 
                                    className="btn btn-primary btn-lg px-5 py-3"
                                >
                                    View Detailed Medicine Administration History
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListofMedicinesTaken;