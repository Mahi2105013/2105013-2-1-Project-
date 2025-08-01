import React, { Fragment, useState } from "react";

const InputPatient = () => {
    const [formData, setFormData] = useState({
        FIRST_NAME: "",
        LAST_NAME: "",
        DATE_OF_BIRTH: "",
        EMAIL: "",
        GENDER: "",
        CONTACT_NO: "",
        ADDRESS: "",
        CITY: "",
        DISEASE: "",
        BED_ID: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!formData.FIRST_NAME.trim() || !formData.LAST_NAME.trim()) {
                alert("First and last names are required");
                return;
            }

            if(!formData.BED_ID.trim()) {
                alert("You must specify a Bed ID!");
                return;
            }

            if (!/^\d{11}$/.test(formData.CONTACT_NO.trim())) {
                alert("Contact number must be 11 digits");
                return;
            }

            if (formData.EMAIL.trim() && !/^\S+@\S+\.\S+$/.test(formData.EMAIL.trim())) {
                alert("Invalid email address");
                return;
            }

            if (formData.DATE_OF_BIRTH.trim() && !/^(\d{2}\/\d{2}\/\d{4})?$/.test(formData.DATE_OF_BIRTH.trim())) {
                alert("Date must be in DD/MM/YYYY format or empty");
                return;
            }

            const response3 = await fetch(`http://localhost:5000/allocateverifier?newBedId=${formData.BED_ID}`);
            const jsonData3 = await response3.json();

            if(jsonData3.length > 0) {
                alert('Bed is already occupied!');
                return;
            }

            const response = await fetch("http://localhost:5000/patients", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            
            if(response.ok) {
                alert("Patient registration successful");
                window.location = "/home";
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during registration");
        }  
    };

    return (
        <div className="patient-registration" style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/hospitalpic1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '2rem 0'
        }}>
            <div className="container">
                <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '800px' }}>
                    <div className="card-header bg-primary text-white">
                        <h1 className="h3 mb-0 text-center">
                            
                            New Patient Admission
                        </h1>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={onSubmitForm}>
                            <div className="row g-4">
                                {/* Personal Information */}
                                <div className="col-md-6">
                                    <h5 className="text-primary mb-3">
                                        
                                        Personal Information
                                    </h5>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            First Name *
                                        </label>
                                        <input 
                                            type="text"
                                            name="FIRST_NAME"
                                            className="form-control"
                                            value={formData.FIRST_NAME}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Last Name *
                                        </label>
                                        <input 
                                            type="text"
                                            name="LAST_NAME"
                                            className="form-control"
                                            value={formData.LAST_NAME}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Date of Birth (DD/MM/YYYY)
                                        </label>
                                        <input 
                                            type="text"
                                            name="DATE_OF_BIRTH"
                                            className="form-control"
                                            value={formData.DATE_OF_BIRTH}
                                            onChange={handleChange}
                                            placeholder="DD/MM/YYYY"
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Gender
                                        </label>
                                        <select 
                                            name="GENDER"
                                            className="form-select"
                                            value={formData.GENDER}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Contact Information */}
                                <div className="col-md-6">
                                    <h5 className="text-primary mb-3">
                                        
                                        Contact Information
                                    </h5>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Email
                                        </label>
                                        <input 
                                            type="email"
                                            name="EMAIL"
                                            className="form-control"
                                            value={formData.EMAIL}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Contact No *
                                        </label>
                                        <input 
                                            type="tel"
                                            name="CONTACT_NO"
                                            className="form-control"
                                            value={formData.CONTACT_NO}
                                            onChange={handleChange}
                                            pattern="\d{11}"
                                            title="11 digit phone number"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            Address
                                        </label>
                                        <input 
                                            type="text"
                                            name="ADDRESS"
                                            className="form-control"
                                            value={formData.ADDRESS}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">
                                            
                                            City
                                        </label>
                                        <input 
                                            type="text"
                                            name="CITY"
                                            className="form-control"
                                            value={formData.CITY}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                
                                {/* Medical Information */}
                                <div className="col-12">
                                    <h5 className="text-primary mb-3">
                                        
                                        Medical Information
                                    </h5>
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                
                                                Disease/Condition
                                            </label>
                                            <input 
                                                type="text"
                                                name="DISEASE"
                                                className="form-control"
                                                value={formData.DISEASE}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                
                                                Bed Allocation *
                                            </label>
                                            <div className="input-group">
                                                <input 
                                                    type="text"
                                                    name="BED_ID"
                                                    className="form-control"
                                                    value={formData.BED_ID}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <a 
                                                    href="/beds" 
                                                    className="btn btn-outline-primary"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Check Available Beds
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="col-12 text-center mt-4">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg px-5 py-3"
                                    >
                                        
                                        Register Patient
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputPatient;