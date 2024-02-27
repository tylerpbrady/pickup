import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function CreateAccountPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // where we should handle the form submission and connect to backend
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <button type="submit">Create Account</button>
            <Link to="/welcome">
              <button>Back to Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage;
