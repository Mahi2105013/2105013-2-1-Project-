import React, {Fragment, useEffect, useState} from "react";
import InputTest from "./InputTest";
import EditTest from "./Editing/EditTest";

const ListofTests = () => {
    const [tests, setTests] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: "",
        name2: ""
    });
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchStats, setSearchStats] = useState({
        rowsFetched: -1,
        totalRows: 0
    });

    const handleSearchChange = (e) => {
        const {name, value} = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const Searcher = async e => {
        e.preventDefault();
        try {
            const {name, name2} = searchParams;
            const response = await fetch(`http://localhost:5000/testsssearch/?name=${name}&name2=${name2}`);
            const parseResponse = await response.json();
            setSearchStats(prev => ({
                ...prev,
                rowsFetched: parseResponse.length
            }));
            setTests(parseResponse);
        } catch (err) {
            console.error(err.message);
        } 
    };

    const deleteTest = async (TEST_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this test?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/tests/${TEST_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setTests(prev => prev.filter(test => test.TEST_ID !== TEST_ID));
            } else {
                console.log(`Error deleting test with ID ${TEST_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTests = async() => {
        try {
            setEmail(localStorage.getItem('email'));
            const response = await fetch("http://localhost:5000/tests");
            const jsonData = await response.json();
            setSearchStats(prev => ({
                rowsFetched: -1,
                totalRows: jsonData.length
            }));
            setTests(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTests();
    }, []);

    return (
        <Fragment>
            {/* Header Section */}
            <div className="container-fluid bg-info text-white py-4">
                <div className="container">
                    <h1 className="display-5 fw-bold">Diagnostic Tests</h1>
                    <p className="lead">Manage and search for available medical tests</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                {/* Action Buttons */}
                <div className="d-flex justify-content-between mb-4">
                    <a href="#search-section" className="btn btn-outline-info">
                        <i className="fas fa-search me-2"></i> Search Tests
                    </a>
                    {email === 'admin@gmail.com' && (
                        <button 
                            className="btn btn-success"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="fas fa-plus me-2"></i> Add New Test
                        </button>
                    )}
                </div>

                {/* Search Section */}
                <div id="search-section" className="card shadow mb-5">
                    <div className="card-header bg-white border-bottom-0">
                        <h2 className="h4 mb-0 text-info">
                            <i className="fas fa-search me-2"></i> Test Search
                        </h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={Searcher}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Test Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-flask"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter test name"
                                            value={searchParams.name}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Description</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-align-left"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name2"
                                            className="form-control"
                                            placeholder="Enter description"
                                            value={searchParams.name2}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-info px-4 text-white" type="submit">
                                        <i className="fas fa-search me-2"></i> Search
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary ms-2"
                                        onClick={() => {
                                            setSearchParams({
                                                name: "",
                                                name2: ""
                                            });
                                            getTests();
                                        }}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Search Results Info */}
                {searchStats.rowsFetched !== -1 && (
                    <div className={`alert ${searchStats.rowsFetched === 0 ? 'alert-warning' : 'alert-info'} mb-4`}>
                        {searchStats.rowsFetched === 0 ? (
                            <i className="fas fa-exclamation-circle me-2"></i>
                        ) : (
                            <i className="fas fa-info-circle me-2"></i>
                        )}
                        {searchStats.rowsFetched === 0 
                            ? "No results matched your search criteria." 
                            : `Found ${searchStats.rowsFetched} matching test(s).`}
                    </div>
                )}

                {/* Tests List */}
                <h2 className="h4 mb-4">
                    <i className="fas fa-list-ul me-2"></i> Available Tests
                </h2>
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {tests.map(test => (
                        <div className="col" key={test.TEST_ID}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-light">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mb-0 text-info">
                                            {test.TYPE}
                                        </h5>
                                        <span className="badge bg-info text-white">
                                            ID: {test.TEST_ID}
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <h6 className="text-muted mb-1">Description</h6>
                                        <p className="text-justify">{test.DESCRIPTION}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <h6 className="text-muted mb-0">Cost</h6>
                                            <span className="h5 text-success mb-0">৳{test.COST}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {email === 'admin@gmail.com' && (
                                    <div className="card-footer bg-transparent d-flex justify-content-between">
                                        <EditTest todo={test} />
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => deleteTest(test.TEST_ID)}
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

            {/* Add Test Modal */}
            {showModal && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-plus-circle me-2"></i> Add New Test
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <InputTest 
                                    onSuccess={() => {
                                        setShowModal(false);
                                        getTests();
                                    }} 
                                />
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ListofTests;