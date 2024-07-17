// adding a new patient 

import React, { Fragment, useState } from "react";
const InputPatient = () => {

    // FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY
    //const [descriptionn, setDescriptionn] = useState("");

    const [FIRST_NAME, SETFIRST_NAME] = useState("");
    const [LAST_NAME, SETLAST_NAME] = useState("");
    const [DATE_OF_BIRTH, SETDATE_OF_BIRTH] = useState("");
    const [EMAIL, SETEMAIL] = useState("");
    const [GENDER, SETGENDER] = useState("");
    const [CONTACT_NO, SETCONTACT_NO] = useState("");
    const [ADDRESS, SETADDRESS] = useState("");
    const [CITY, SETCITY] = useState("");
    const [DISEASE, SETDISEASE] = useState("");
    const [BED_ID, SETBED_ID] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!FIRST_NAME.trim() || !LAST_NAME.trim())
            {
                alert("First and last names are necessary");
                return;
            }

            if(!BED_ID.trim())
            {
                alert("You must set the Bed ID!")
                return;
            }

            // Check if contact number contains only numeric characters and has precisely 11 digits
            if (!/^\d{11}$/.test(CONTACT_NO.trim())) {
            alert("Contact number must contain only numeric characters and be precisely 11 digits.");
            return; // Prevent further execution of the form submission
            }

            // Check email validity
            if (EMAIL.trim() && !/^\S+@\S+\.\S+$/.test(EMAIL.trim())) {
            alert("Invalid email address.");
            return; // Prevent further execution of the form submission
            }

            if (DATE_OF_BIRTH.trim() && !/^(\d{2}\/\d{2}\/\d{4})?$/.test(DATE_OF_BIRTH.trim())) {
                alert("Date of birth must be null or in the format DD/MM/YYYY.");
                return; // Prevent further execution of the form submission
            }

            const response3 = await fetch(`http://localhost:5000/allocateverifier?newBedId=${BED_ID}`);
            const jsonData3 = await response3.json();

            if(jsonData3.length > 0)
            {
                alert('Invalid! Bed is already occupied!')
                return;
            }

            const body = { FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE, BED_ID } // this may contain many other stuff
            const response = await fetch("http://localhost:5000/patients",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/home";
            alert("Registration successful");
        } catch (error) {
            console.log(error);
        }  
    };

    return (
        <Fragment>
            <div style = {{backgroundImage: `url('/hospitalpic1.jpg')`}} >
            {<h1 className="text-center mt-5">Admit a new patient</h1>}
            <form className="text-center d-flex mt-5" onSubmit={onSubmitForm}>
            <div className="mx-auto align-items-center"> {/* mx-auto will center the div horizontally
             display AND D-FLEX FORCES THEM IN ONE ROW*/}
                <label for="FIRST_NAME"> FIRST NAME: </label>
                <input type = "text" 
                className="form-control" value = {FIRST_NAME}
                style={{ width: '300px', height: '30px' }}
                placeholder="First Name"
                //title="Todo Description" // Add a title attribute for additional context
  
                onChange={e => SETFIRST_NAME(e.target.value)} // change the description
                />
                

                <label for="LAST_NAME"> LAST NAME: </label>
                <input type = "text" 
                className="form-control" value = {LAST_NAME}
                style={{ width: '300px', height: '30px' }}
                placeholder="Last Name"
  
                onChange={e => SETLAST_NAME(e.target.value)} // change the description
                />

                <label for="DATE_OF_BIRTH"> DATE OF BIRTH: </label>
                <input type = "text" 
                className="form-control" value = {DATE_OF_BIRTH}
                style={{ width: '300px', height: '30px' }}
                placeholder="Date of Birth (DD/MM/YYYY)"
  
                onChange={e => SETDATE_OF_BIRTH(e.target.value)} // change the description
                />
                
                <label for="EMAIL"> EMAIL: </label>
                <input type = "text" 
                className="form-control" value = {EMAIL}
                style={{ width: '300px', height: '30px' }}
                placeholder="EMAIL"
  
                onChange={e => SETEMAIL(e.target.value)} // change the description
                />

                <label for="GENDER"> GENDER: </label>
                <input type = "text" 
                className="form-control" value = {GENDER}
                style={{ width: '300px', height: '30px' }}
                placeholder="GENDER"
  
                onChange={e => SETGENDER(e.target.value)} // change the description
                />

            <label for="CONTACT_NO"> CONTACT NO: </label>
                <input type = "text" 
                className="form-control" value = {CONTACT_NO}
                style={{ width: '300px', height: '30px' }}
                placeholder="CONTACT NO"
  
                onChange={e => SETCONTACT_NO(e.target.value)} // change the description
                />

                <label for="ADDRESS"> ADDRESS: </label>
                <input type = "text" 
                className="form-control" value = {ADDRESS}
                style={{ width: '300px', height: '30px' }}
                placeholder="Address"
  
                onChange={e => SETADDRESS(e.target.value)} // change the description
                />

            
                <label for="CITY"> CITY: </label>
                <input type = "text" 
                className="form-control" value = {CITY}
                style={{ width: '300px', height: '30px' }}
                placeholder="City"
  
                onChange={e => SETCITY(e.target.value)} // change the description
                />

                <label for="DISEASE"> DISEASE: </label>
                <input type = "text" 
                className="form-control" value = {DISEASE}
                style={{ width: '300px', height: '30px' }}
                placeholder="ENTER DISEASE ..."
  
                onChange={e => SETDISEASE(e.target.value)} // change the description
                />

                <label for="BED_ID"> ALLOCATE BED (ENTER BED_ID): </label>
                <input type = "text" 
                className="form-control" value = {BED_ID}
                style={{ width: '300px', height: '30px' }}
                placeholder="ENTER BED_ID ..."
  
                onChange={e => SETBED_ID(e.target.value)} // change the description
                />
                <p></p>
                <div style={{fontSize: '20px', backgroundColor: 'white'}}> <a href="http://localhost:3000/beds">
                    [Check list of available beds here]
                </a> </div>

                <p> </p>
                <p> </p>
                
                <button className="btn btn-success">
                    <div style={{fontSize: '24px'}}> Register</div>
                </button> 
                <p> </p>
                <p> </p>
                </div>
            </form>
        {/*</div>
        </div>*/}
        </div>
        </Fragment>
    )
}

export default InputPatient;