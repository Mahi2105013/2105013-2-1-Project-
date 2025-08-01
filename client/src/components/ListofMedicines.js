import React, {Fragment, useEffect, useState} from "react";
import InputMedicine from "./InputMedicine";
import EditMedicine from "./Editing/EditMedicine";

const ListofMedicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: "",
        name2: "",
        description: "",
        manufacturer: ""
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
            const {name, name2, description, manufacturer} = searchParams;
            const response = await fetch(`http://localhost:5000/medicinessearch/?name=${name}&name2=${name2}&description=${description}&manufacturer=${manufacturer}`);
            const parseResponse = await response.json();
            setSearchStats(prev => ({
                ...prev,
                rowsFetched: parseResponse.length
            }));
            setMedicines(parseResponse);
        } catch (err) {
            console.error(err.message);
        } 
    };

    const deleteMedicine = async (MEDICINE_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this medicine?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/medicines/${MEDICINE_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setMedicines(prev => prev.filter(med => med.MEDICINE_ID !== MEDICINE_ID));
            } else {
                console.log(`Error deleting medicine with ID ${MEDICINE_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMedicines = async() => {
        try {
            setEmail(localStorage.getItem('email'));
            const response = await fetch("http://localhost:5000/medicines");
            const jsonData = await response.json();
            setSearchStats(prev => ({
                rowsFetched: -1,
                totalRows: jsonData.length
            }));
            setMedicines(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMedicines();
    }, []);

    return (
        <Fragment>
            {/* Header Section */}
            <div className="container-fluid bg-primary text-white py-4">
                <div className="container">
                    <h1 className="display-5 fw-bold">Pharmacy Inventory</h1>
                    <p className="lead">Manage and search for available medicines</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                {/* Action Buttons */}
                <div className="d-flex justify-content-between mb-4">
                    <a href="#search-section" className="btn btn-outline-primary">
                        <i className="fas fa-search me-2"></i> Search Medicines
                    </a>
                    {email === 'admin@gmail.com' && (
                        <button 
                            className="btn btn-success"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="fas fa-plus me-2"></i> Add New Medicine
                        </button>
                    )}
                </div>

                {/* Search Section */}
                <div id="search-section" className="card shadow mb-5">
                    <div className="card-header bg-white border-bottom-0">
                        <h2 className="h4 mb-0 text-primary">
                            <i className="fas fa-search me-2"></i> Advanced Medicine Search
                        </h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={Searcher}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Trade Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-trademark"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name2"
                                            className="form-control"
                                            placeholder="Enter medicine trade name"
                                            value={searchParams.name2}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Generic Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-pills"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter medicine generic name"
                                            value={searchParams.name}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Description</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-info-circle"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder="Enter description"
                                            value={searchParams.description}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Manufacturer</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-industry"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="manufacturer"
                                            className="form-control"
                                            placeholder="Enter manufacturer"
                                            value={searchParams.manufacturer}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary px-4" type="submit">
                                        <i className="fas fa-search me-2"></i> Search
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary ms-2"
                                        onClick={() => {
                                            setSearchParams({
                                                name: "",
                                                name2: "",
                                                description: "",
                                                manufacturer: ""
                                            });
                                            getMedicines();
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
                            : `Found ${searchStats.rowsFetched} matching medicine(s).`}
                    </div>
                )}

                {/* Medicines List */}
                <h2 className="h4 mb-4">
                    <i className="fas fa-list-ul me-2"></i> Available Medicines
                </h2>
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {medicines.map(medicine => (
                        <div className="col" key={medicine.MEDICINE_ID}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-light">
                                    <h5 className="card-title mb-0 text-primary">
                                        {medicine.TRADE_NAME}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <h6 className="text-muted mb-1">Generic Name</h6>
                                        <p>{medicine.GENERIC_NAME}</p>
                                        
                                        <h6 className="text-muted mb-1">Strength</h6>
                                        <p>{medicine.STRENGTH}</p>
                                        
                                        <h6 className="text-muted mb-1">Description</h6>
                                        <p className="text-truncate">{medicine.DESCRIPTION}</p>
                                    </div>
                                    
                                    <ul className="list-group list-group-flush mb-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <i className="fas fa-id-card me-2 text-muted"></i>
                                                ID
                                            </span>
                                            <span className="badge bg-light text-dark">{medicine.MEDICINE_ID}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <i className="fas fa-industry me-2 text-muted"></i>
                                                Manufacturer
                                            </span>
                                            <span>{medicine.MANUFACTURER}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <i className="fas fa-tag me-2 text-muted"></i>
                                                Price
                                            </span>
                                            <span className="fw-bold text-success">৳{medicine.PRICE}</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                {email === 'admin@gmail.com' && (
                                    <div className="card-footer bg-transparent d-flex justify-content-between">
                                        <EditMedicine todo={medicine} />
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => deleteMedicine(medicine.MEDICINE_ID)}
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

            {/* Add Medicine Modal */}
            {showModal && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-plus-circle me-2"></i> Add New Medicine
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <InputMedicine 
                                    onSuccess={() => {
                                        setShowModal(false);
                                        getMedicines();
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

export default ListofMedicines;