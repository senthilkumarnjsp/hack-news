import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [employee, setEmployee] = useState("");

  const handleInputChange = (e) => {
    let input = e.target.value;
    setEmployee(input);
  };

  // Method to handle login functionality
  const handleSignin = async (e) => {
    e.preventDefault();
    const result = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ empID: employee }),
    });
    const token = await result.json();
    console.log(token);
    setWithExpiry("authToken", token, 10800000);
  };

  // Method to set the token retrieved from server in local storage with expiration
  function setWithExpiry(key, value, ttl) {
    const now = new Date();
    console.log(value);
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      token: value.authToken,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    props.handleUser(value.payload);
    props.history.push({
      pathname: "/home",
    });
  }

  return (
    <>
      <div className="login-box">
        {/* Login component of the app */}
        <h2>LOGIN</h2>
        <input
          type="text"
          id="empID"
          name="empID"
          onChange={handleInputChange}
          className="login-input"
          placeholder="Enter your employee ID here"
        />
        <br />
        <button onClick={handleSignin}>Sign in</button>
      </div>
    </>
  );
};

export default withRouter(Login);
