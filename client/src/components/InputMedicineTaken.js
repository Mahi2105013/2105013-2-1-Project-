// adding a new patient 

import React, { Fragment, useState } from "react";
const InputMedicineTaken = () => {
    const [ADMISSION_ID, SETADMISSION_ID] = useState("");
    const [MEDICINE_ID, SETMEDICINE_ID] = useState("");
    const [QUANTITY, SETQUANTITY] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!ADMISSION_ID.trim() || !MEDICINE_ID.trim() || !QUANTITY.trim())
            {
                alert("YOU CANNOT LEAVE ANY INPUT BOX EMPTY!");
                return;
            }

            const body = { ADMISSION_ID, MEDICINE_ID, QUANTITY } // this may contain many other stuff
            const response = await fetch("http://localhost:5000/medicinestaken",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/medicinestaken";
            alert("New record insertion successful");
        } catch (error) {
            console.log(error);
        }  
    };

    return (
        <Fragment>
            {<h1 className="text-center mt-5">Add a new medicine taken record</h1>}
            <form className="text-center d-flex" onSubmit={onSubmitForm}>
            <div className="mx-auto align-items-center"> {/* mx-auto will center the div horizontally
             display AND D-FLEX FORCES THEM IN ONE ROW*/}
                <label for="ADMISSION_ID"> ADMISSION_ID: </label>
                <input type = "text" 
                className="form-control" value = {ADMISSION_ID}
                style={{ width: '300px', height: '30px' }}
                placeholder="ADMISSION ID ..."
                //title="Todo Description" // Add a title attribute for additional context
  
                onChange={e => SETADMISSION_ID(e.target.value)} // change the description
                />
                

                <label for="MEDICINE_ID"> MEDICINE ID: </label>
                <input type = "text" 
                className="form-control" value = {MEDICINE_ID}
                style={{ width: '300px', height: '30px' }}
                placeholder="MEDICINE ID ..."
  
                onChange={e => SETMEDICINE_ID(e.target.value)} // change the description
                />

                <a href="http://localhost:3000/medicines">
                    [To see the list of medicines, click here]
                </a>
                <br />

                <label for="QUANTITY"> QUANTITY: </label>
                <input type = "text" 
                className="form-control" value = {QUANTITY}
                style={{ width: '300px', height: '30px' }}
                placeholder="QUANTITY ..."
  
                onChange={e => SETQUANTITY(e.target.value)} // change the description
                />
                <p> </p>
                <p> </p>
                
                <button className="btn btn-primary">Submit</button>
                <p> </p>
                <p> </p>
                </div>
            </form>
        {/*</div>
        </div>*/}
        </Fragment>
    )
}

export default InputMedicineTaken;