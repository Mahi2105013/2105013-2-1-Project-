import React, { Fragment, useState } from "react";

const EditMedicine = ({ todo }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [TRADE_NAME, setTRADE_NAME] = useState(todo.TRADE_NAME);
  const [GENERIC_NAME, setGENERIC_NAME] = useState(todo.GENERIC_NAME);
  const [STRENGTH, setSTRENGTH] = useState(todo.STRENGTH);
  const [DESCRIPTION, setDESCRIPTION] = useState(todo.DESCRIPTION);
  const [MANUFACTURER, setMANUFACTURER] = useState(todo.MANUFACTURER);
  const [PRICE, setPRICE] = useState(todo.PRICE);

  //edit DESCRIPTIONN function

  const resetToEarlier = (todo) => {
    setTRADE_NAME(todo.TRADE_NAME);
    setGENERIC_NAME(todo.GENERIC_NAME);
    setMANUFACTURER(todo.MANUFACTURER);
    setPRICE(todo.PRICE);
    setSTRENGTH(todo.STRENGTH);
    setDESCRIPTION(todo.DESCRIPTION);
  };

  const updateMedicine = async e => {
    e.preventDefault();
    try {
      if(TRADE_NAME.trim() === '' || GENERIC_NAME.trim() === '' || MANUFACTURER.trim() == '')
      {
        alert("You must enter Trade Name, Generic Name and Manufacturer Name")
        return;
      }

      // if (!/^\d+$/.test(PRICE.trim())) {
      //   alert("PRICE MUST BE NUMERIC!");
      //   return; // Prevent further execution of the form submission
      // }

      const body = { TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE };
      const response = await fetch(
        `http://localhost:5000/medicines/${todo.MEDICINE_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      alert("Editing was successful")
      window.location = "/medicines";
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
        data-target={`#id${todo.MEDICINE_ID}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal fade"
        id={`id${todo.MEDICINE_ID}`}
        //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
        onClick={() => resetToEarlier(todo)}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{backgroundColor: 'rgba(40,167,69,1)'}}>
            <div class="modal-header"> {/*the header*/}
              <h4 class="modal-title">Edit Medicine Details</h4>
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
            <label for="TRADE_NAME"> {"TRADE_NAME : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new trade name"
                value={TRADE_NAME}
                onChange={e => setTRADE_NAME(e.target.value)} 
                />
              </div>
            <p></p>
            <div class="d-flex">
            <label for="GENERIC_NAME"> {"GENERIC_NAME : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new generic name"
                value={GENERIC_NAME}
                onChange={e => setGENERIC_NAME(e.target.value)}
              />
              </div>
            <p></p>  
            <div class="d-flex">
            <label for="STRENGTH"> {"STRENGTH : "} </label>
              <input
                type="text"
                className="form-
                control"
                placeholder="Set new strength"
                value={STRENGTH}
                onChange={e => setSTRENGTH(e.target.value)}
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
            <label for="MANUFACTURER"> {"MANUFACTURER : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new manufacturer"
                value={MANUFACTURER}
                onChange={e => setMANUFACTURER(e.target.value)}
              />
              </div>
              <p></p>
              <div class="d-flex">
            <label for="PRICE"> {"PRICE : "} </label>
              <input
                type="number"
                className="form-control"
                placeholder="Set new price"
                value={PRICE}
                onChange={e => setPRICE(e.target.value)}
              />
              </div>
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

export default EditMedicine;
