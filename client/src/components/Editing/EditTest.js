import React, { Fragment, useState } from "react";

const EditTest = ({ todo }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [TYPE, setTYPE] = useState(todo.TYPE);
  const [DESCRIPTION, setDESCRIPTION] = useState(todo.DESCRIPTION);
  const [COST, setCOST] = useState(todo.COST);

  //edit DESCRIPTIONN function

  const resetToEarlier = (todo) => {
    setTYPE(todo.TYPE);
    setDESCRIPTION(todo.DESCRIPTION);
    setCOST(todo.COST);
  };

  const updateMedicine = async e => {
    e.preventDefault();
    try {
      if(TYPE.trim() === '')
      {
        alert("TEST NAME CANNOT BE EMPTY!")
        return;
      }

      const body = { TYPE, DESCRIPTION, COST };
      const response = await fetch(
        `http://localhost:5000/tests/${todo.TEST_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      alert("Editing was successful")
      window.location = "/tests";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.TEST_ID}`}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={`id${todo.TEST_ID}`}
        //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
        onClick={() => resetToEarlier(todo)}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{backgroundColor: 'rgba(40,167,69,1)'}}>
            <div class="modal-header"> {/*the header*/}
              <h4 class="modal-title">Edit Test Details</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
                onClick={() => resetToEarlier(todo)}
              > CLOSE
                &times;
            </button>
            </div>

            <div class="modal-body"> {/*body of modal*/}
            <div class="d-flex">
            <label for="TYPE"> {"TYPE : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new test name"
                value={TYPE}
                onChange={e => setTYPE(e.target.value)} 
                />
              </div>
            <p></p>
            <div class="d-flex">
            <label for="DESCRIPTION"> {"DESCRIPTION : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new description"
                value={DESCRIPTION}
                onChange={e => setDESCRIPTION(e.target.value)}
              />
              </div>
            <p></p>  
            <div class="d-flex">
            <label for="COST"> {"COST : "} </label>
              <input
                type="text"
                className="form-
                control"
                placeholder="Set new COST"
                value={COST}
                onChange={e => setCOST(e.target.value)}
              />
              </div>
              <p></p>
              
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateMedicine(e)}
              >
                Edit
              </button>
              {/*<button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
                onClick={() => resetToEarlier(todo)}
              >
                Close
            </button>*/}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTest;
