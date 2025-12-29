import React from "react";

function FormikForm() {
  return (
    <div>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="">Email</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="">Channel</label>
        <input type="text" id="channel" name="channel" />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default FormikForm;
