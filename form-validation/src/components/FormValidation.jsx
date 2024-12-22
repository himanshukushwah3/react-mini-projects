import React, { useState, useRef } from "react";
import style from "./form.module.css";

const FormValidation = () => {
  const [formValid, setFormValid] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValid({ ...formValid, [name]: value });
  };

  const validateForm = () => {
    let isValidated = true;
    const newErrors = {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    // name Validation
    if (formValid.name.trim() === "") {
      newErrors.name = "Name is Required";
      isValidated = false;
    }

    // Username Validation
    if (formValid.username.trim() === "") {
      newErrors.username = "Username is Required";
      isValidated = false;
    }

    // Email Validation
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValid.email.match(emailReg)) {
      newErrors.email = `Invalid Email Address`;
      isValidated = false;
    }

    // Password Validation
    const passReg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formValid.password.length >= 8) {
      if (!formValid.password.match(passReg)) {
        newErrors.password = `password must contain Uppercase, Lowercase and Special Character`;
        isValidated = false;
      }
    } else {
      newErrors.password = "Password should be at least eight characters long.";
      isValidated = false;
    }

    // Confirm Password Validation
    if (formValid.confirmPassword !== formValid.password) {
      newErrors.confirmPassword = "Password are not Matching";
      isValidated = false;
    }
    setErr(newErrors);
    return isValidated;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(`Form Submitted`, formValid);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={style.formInput}>
            {/* <label htmlFor="Username">Full Name</label> */}
            <input
              type="text"
              name="name"
              placeholder="Enter Your Full Name..."
              onChange={handleChange}
            />
            {err.name && (
              <span>
                {err.name}
                <sup>*</sup>
              </span>
            )}
          </div>
          <div className={style.formInput}>
            {/* <label htmlFor="Username">Username</label> */}
            <input
              type="text"
              name="username"
              placeholder="Enter Your Username..."
              onChange={handleChange}
            />
            {err.username && (
              <span>
                {err.username}
                <sup>*</sup>
              </span>
            )}
          </div>
          <div className={style.formInput}>
            {/* <label htmlFor="Username">Email</label> */}
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email..."
              onChange={handleChange}
            />
            {err.email && (
              <span>
                {err.email}
                <sup>*</sup>
              </span>
            )}
          </div>
          <div className={style.formInput}>
            {/* <label htmlFor="Username">Username</label> */}
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              onChange={handleChange}
            />
            {err.password && <span>{err.password}</span>}
          </div>
          <div className={style.formInput}>
            {/* <label htmlFor="Username">Username</label> */}
            <input
              type="password"
              name="cfnpassword"
              placeholder="Confirm Password..."
              onChange={handleChange}
            />
            {err.confirmPassword && <span>{err.name}</span>}
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormValidation;
