import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  const navigate = useNavigate();
  const validLogin = () => toast.success("Login Successful");
  const failedLogin = () => toast.error("Error: Login failed");

  return (
    <form>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
      <ToastContainer
        position="top-center"
      />
    </form>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
      default:
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds).then((res) => {
      if (res) {
        setCreds({ username: "", pwd: "" });
        localStorage.setItem("name", creds.username);
        navigate("/home");
        validLogin();
      }
      else {
        failedLogin();
      }
    });
  }
}
export default Login;
