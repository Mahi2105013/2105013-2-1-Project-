// adding a new patient 

import React, { Fragment, useState } from "react";
const InputTest = () => {

    // FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY
    //const [descriptionn, setDescriptionn] = useState("");

    const [TYPE, SETTYPE] = useState("");
    const [DESCRIPTION, SETDESCRIPTION] = useState("");
    const [COST, SETCOST] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!TYPE.trim() || !COST.trim())
            {
                alert("YOU MUST INPUT TEST NAME AND PRICE");
                return;
            }

            // Check if contact number contains only numeric characters and has precisely 11 digits
            if (!/^\d+$/.test(COST.trim())) {
                alert("COST MUST BE NUMERIC!");
            return; // Prevent further execution of the form submission
            }


            //const body = { FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY } // this may contain many other stuff
            const body = { TYPE, DESCRIPTION, COST } // this may contain many other stuff
            const response = await fetch("http://localhost:5000/tests",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
            alert("New test addition successful");
        } catch (error) {
            console.log(error);
        }  
    };

    return (
        <Fragment>
            {<h1 className="text-center mt-5" id = "form">Add a new Test</h1>}
            <form className="text-center d-flex mt-5" onSubmit={onSubmitForm} style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
            <div className="mx-auto align-items-center"> {/* mx-auto will center the div horizontally
             display AND D-FLEX FORCES THEM IN ONE ROW*/}
                <label for="TYPE"> TEST NAME: </label>
                <input type = "text" 
                className="form-control" value = {TYPE}
                style={{ width: '300px', height: '30px' }}
                placeholder="TEST NAME"
                //title="Todo Description" // Add a title attribute for additional context
  
                onChange={e => SETTYPE(e.target.value)} // change the description
                />
                

                <label for="DESCRIPTION"> DESCRIPTION </label>
                <input type = "text" 
                className="form-control" value = {DESCRIPTION}
                style={{ width: '300px', height: '300px' }}
                placeholder="DESCRIPTION"
  
                onChange={e => SETDESCRIPTION(e.target.value)} // change the description
                />

                <label for="COST"> COST [IN TAKA]: </label>
                <input type = "text" 
                className="form-control" value = {COST}
                style={{ width: '300px', height: '30px' }}
                placeholder="COST"
  
                onChange={e => COST(e.target.value)} // change the description
                />
                
                
                <p> </p>
                <p> </p>
                
                <button className="btn btn-success">Add Test</button>
                <p> </p>
                <p> </p>
                </div>
            </form>
        {/*</div>
        </div>*/}
        </Fragment>
    )
}

export default InputTest;