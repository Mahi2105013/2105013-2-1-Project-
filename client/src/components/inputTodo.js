import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [DESCRIPTIONN, setDESCRIPTIONN] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { DESCRIPTIONN };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={DESCRIPTIONN}
          onChange={e => setDESCRIPTIONN(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
