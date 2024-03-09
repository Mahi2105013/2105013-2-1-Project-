// adding a new patient 

import React, { Fragment, useState } from "react";
import InputTest from "./InputTest";
const InputTestTaken = () => {
    const [ADMISSION_ID, SETADMISSION_ID] = useState("");
    const [TEST_ID, SETTEST_ID] = useState("");
    const [REPORT, SETREPORT] = useState(
    `Test Name: 
    Patient Information:
    - Name: 
    - Age: 
    - Gender: 
    - Date of Test: 
    Test Details:
    - Test Type: 
    - Results:
    Conclusion: `);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(!ADMISSION_ID.trim() || !TEST_ID.trim() || !REPORT.trim())
            {
                alert("YOU CANNOT LEAVE ANY INPUT BOX EMPTY!");
                return;
            }

            const body = { ADMISSION_ID, TEST_ID, REPORT } // this may contain many other stuff
            const response = await fetch("http://localhost:5000/teststakeninsertion",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/teststaken";
            alert("New record insertion successful");
        } catch (error) {
            console.log(error);
        }  
    };

    return (
        <Fragment>
            {<h1 className="text-center mt-5">Add a new test taken record</h1>}
            <form className="text-center d-flex" onSubmit={onSubmitForm}>
            <div className="mx-auto align-items-center"> {/* mx-auto will center the div horizontally
             display AND D-FLEX FORCES THEM IN ONE ROW*/}
                <label for="ADMISSION_ID"> ADMISSION_ID: </label>
                <center>
                <input type = "text" 
                className="form-control" value = {ADMISSION_ID}
                style={{ width: '300px', height: '30px' }}
                placeholder="ADMISSION ID ..."
                //title="Todo Description" // Add a title attribute for additional context
  
                onChange={e => SETADMISSION_ID(e.target.value)} // change the description
                />
                </center>

                <label for="TEST_ID"> TEST ID: </label>
                <center>
                <input type = "text" 
                className="form-control" value = {TEST_ID}
                style={{ width: '300px', height: '30px' }}
                placeholder="TEST ID ..."
  
                onChange={e => SETTEST_ID(e.target.value)} // change the description
                />
                </center>
                <a href="http://localhost:3000/tests">
                    [To see the list of tests, click here]
                </a>
                <br />

                <label for="REPORT"> REPORT: </label>
                {/* <input type = "text" 
                className="form-control" value = {REPORT}
                style={{ width: '300px', height: '30px' }}
                placeholder="REPORT ..."
  
                onChange={e => SETREPORT(e.target.value)} // change the description
                /> */}
                <textarea rows="10" cols="100" style={{ resize: 'vertical' }} type = "text"
                className="form-control" value = {REPORT}
                // style={{ width: '300px', height: '30px',  resize: 'vertical'}}
                placeholder="REPORT ..."
  
                onChange={e => SETREPORT(e.target.value)} // change the description
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

export default InputTestTaken;