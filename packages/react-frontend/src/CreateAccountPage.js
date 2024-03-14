import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAccountPage(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const validCreateAcc = () => toast.success("Account Creation Successful");
  const failedCreateAcc = () => toast.error("Error: Account Creation Failed");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function submitForm() {
    props.handleSubmit(formData).then((res) => {
      // if successful, will immediately send user into home
      if (res) {
        localStorage.setItem("name", formData.username);
        setFormData({ username: "", password: "" });
        validCreateAcc();
        setTimeout(() => {
          navigate("/home"); 
        }, 1000);
      }
      else {
        failedCreateAcc();
      }
    })
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
            <ToastContainer
               position="top-center"
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
