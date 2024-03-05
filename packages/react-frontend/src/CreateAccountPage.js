import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function CreateAccountPage(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function submitForm() {
    props.handleSubmit(formData);
    setFormData({ username: "", password: "" });
  }

  return (
    <div className="container">
      <div className="box">
        <h2>Create Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <input
              type="button"
              value={props.buttonLabel || "Create an Account!"}
              onClick={submitForm}
            />
            <Link to="/login">
              <button>Back to Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage;
