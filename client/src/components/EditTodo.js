import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);

  //edit DESCRIPTIONN function

  const updateDESCRIPTIONN = async e => {
    e.preventDefault();
    try {
      const body = { DESCRIPTIONN };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.TODO_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
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
        data-target={`#id${todo.TODO_ID}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${todo.TODO_ID}`}
        onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={DESCRIPTIONN}
                onChange={e => setDESCRIPTIONN(e.target.value)}
              />
              <label for="LAST_NAME"> LAST NAME: </label>
            </div>
            

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDESCRIPTIONN(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
