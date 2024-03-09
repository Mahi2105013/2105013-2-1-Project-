// adding a new patient 

import React, { Fragment, useState } from "react";
const InputMedicine = () => {

    // FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY
    //const [descriptionn, setDescriptionn] = useState("");

    const [TRADE_NAME, SETTRADE_NAME] = useState("");
    const [GENERIC_NAME, SETGENERIC_NAME] = useState("");
    const [STRENGTH, SETSTRENGTH] = useState("");
    const [DESCRIPTION, SETDESCRIPTION] = useState("");
    const [MANUFACTURER, SETMANUFACTURER] = useState("");
    const [PRICE, SETPRCICE] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!TRADE_NAME.trim() || !GENERIC_NAME.trim() || !STRENGTH.trim() || !PRICE.trim())
            {
                alert("YOU MUST INPUT TRADE NAME, GENERIC NAME, STRENGTH AND PRICE");
                return;
            }

            // Check if contact number contains only numeric characters and has precisely 11 digits
            if (!/^\d+$/.test(PRICE.trim())) {
            alert("PRICE MUST BE NUMERIC!");
            return; // Prevent further execution of the form submission
            }


            //const body = { FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY } // this may contain many other stuff
            const body = { TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE } // this may contain many other stuff
            const response = await fetch("http://localhost:5000/medicines",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
            alert("New medicine addition successful");
        } catch (error) {
            console.log(error);
        }  
    };

    return (
        <Fragment>
            {<h1 className="text-center mt-5" id = "form">Add a new medicine</h1>}
            <form className="text-center d-flex mt-5" onSubmit={onSubmitForm} style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
            <div className="mx-auto align-items-center"> {/* mx-auto will center the div horizontally
             display AND D-FLEX FORCES THEM IN ONE ROW*/}
                <label for="TRADE_NAME"> TRADE NAME: </label>
                <input type = "text" 
                className="form-control" value = {TRADE_NAME}
                style={{ width: '300px', height: '30px' }}
                placeholder="TRADE NAME"
                //title="Todo Description" // Add a title attribute for additional context
  
                onChange={e => SETTRADE_NAME(e.target.value)} // change the description
                />
                

                <label for="GENERIC_NAME"> GENERIC NAME: </label>
                <input type = "text" 
                className="form-control" value = {GENERIC_NAME}
                style={{ width: '300px', height: '30px' }}
                placeholder="GENERIC NAME"
  
                onChange={e => SETGENERIC_NAME(e.target.value)} // change the description
                />

                <label for="STRENGTH"> STRENGTH: </label>
                <input type = "text" 
                className="form-control" value = {STRENGTH}
                style={{ width: '300px', height: '30px' }}
                placeholder="STRENGTH"
  
                onChange={e => SETSTRENGTH(e.target.value)} // change the description
                />
                
                <label for="DESCRIPTION"> DESCRIPTION: </label>
                <input type = "text" 
                className="form-control" value = {DESCRIPTION}
                style={{ width: '300px', height: '300px' }}
                placeholder="DESCRIPTION"
  
                onChange={e => SETDESCRIPTION(e.target.value)} // change the description
                />

                <label for="MANUFACTURER"> MANUFACTURER: </label>
                <input type = "text" 
                className="form-control" value = {MANUFACTURER}
                style={{ width: '300px', height: '30px' }}
                placeholder="MANUFACTURER"
  
                onChange={e => SETMANUFACTURER(e.target.value)} // change the description
                />

            <label for="PRICE"> PRICE: </label>
                <input type = "text" 
                className="form-control" value = {PRICE}
                style={{ width: '300px', height: '30px' }}
                placeholder="PRICE"
  
                onChange={e => SETPRCICE(e.target.value)} // change the description
                />

                <p> </p>
                <p> </p>
                
                <button className="btn btn-success">Add Medicine</button>
                <p> </p>
                <p> </p>
                </div>
            </form>
        {/*</div>
        </div>*/}
        </Fragment>
    )
}

export default InputMedicine;