import React, { Fragment, useEffect, useState } from "react";
import InputTestTaken from "./InputTestTaken";
import TestWiseAnalysis from "./Dashboard/TestWiseAnalysis";

const ListofTestsTaken = () => {
    const [tests, setTests] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: "",
        name2: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const getTestNumber = (report) => {
        const match = report?.match(/Test(\d+)\.pdf$/);
        return match && match[1] > 0 && match[1] <= 12 ? match[1] : '';
    };

    const searchTests = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { name, name2 } = searchParams;
            const response = await fetch(`http://localhost:5000/testsssearch/?name=${name}&name2=${name2}`);
            const data = await response.json();
            setTests(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTest = async (TEST_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this test record?");
            if (!confirmed) return;
            
            const response = await fetch(`http://localhost:5000/tests/${TEST_ID}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setTests(prev => prev.filter(test => test.TEST_ID !== TEST_ID));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/teststakenlist");
            const data = await response.json();
            setTests(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    return (
        <div className="container-fluid py-4">
            {/* Header Section */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="h4 mb-0">Tests Taken History</h2>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <button 
                            className="btn btn-outline-primary"
                            onClick={() => document.getElementById('test-analysis').scrollIntoView()}
                        >
                            View Test Analysis
                        </button>
                        <button 
                            className="btn btn-success"
                            onClick={() => document.getElementById('add-test-form').scrollIntoView()}
                        >
                            Add New Test Record
                        </button>
                    </div>

                    {/* Search Form */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <form onSubmit={searchTests} className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Test Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by test name..."
                                        value={searchParams.name}
                                        onChange={(e) => setSearchParams({...searchParams, name: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by description..."
                                        value={searchParams.name2}
                                        onChange={(e) => setSearchParams({...searchParams, name2: e.target.value})}
                                    />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Search
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setSearchParams({name: "", name2: ""});
                                            fetchTests();
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Test Analysis Section */}
                    <div id="test-analysis" className="mb-5">
                        <TestWiseAnalysis />
                    </div>

                    {/* Tests Table */}
                    <div className="card shadow mb-4">
                        <div className="card-header bg-primary text-white">
                            <h3 className="h5 mb-0">Tests Taken Records</h3>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Test Taken ID</th>
                                                <th>Date</th>
                                                <th>Test ID</th>
                                                <th>Test Name</th>
                                                <th>Admission ID</th>
                                                <th>Patient Name</th>
                                                <th>Cost</th>
                                                <th>Report</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tests.map(test => (
                                                <tr key={test.ID1}>
                                                    <td>{test.ID1}</td>
                                                    <td>{test.D}</td>
                                                    <td>{test.ID2}</td>
                                                    <td>{test.TYPE}</td>
                                                    <td>{test.ID3}</td>
                                                    <td>{test.FIRST_NAME} {test.LAST_NAME}</td>
                                                    <td>${test.COST}</td>
                                                    <td>
                                                        {test.ID1 <= 103 ? (
                                                            <a 
                                                                href={`http://localhost:5000/pdf${getTestNumber(test.REPORT)}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                View Report
                                                            </a>
                                                        ) : (
                                                            <span className="text-muted">Not available</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add Test Form */}
                    <div id="add-test-form" className="card shadow">
                        <div className="card-header bg-success text-white">
                            <h3 className="h5 mb-0">Add New Test Record</h3>
                        </div>
                        <div className="card-body">
                            <InputTestTaken />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListofTestsTaken;