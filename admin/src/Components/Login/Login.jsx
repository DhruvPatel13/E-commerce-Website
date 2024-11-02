import React, { useState } from "react";
import loginStyles from "./Login.module.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Login = () => {
  const { setShowLogin, setToken, backendURL , isDark} = useContext(AdminContext);
  const [showPass, setShowPass] = useState(false);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    key: "",
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (evt) => {
    evt.preventDefault();
    let newUrl = backendURL;
    if (currState === "Login") {
      newUrl += "/api/admin/login";
    } else {
      newUrl += "/api/admin/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className={loginStyles.login}>
      <form onSubmit={onLogin} className={loginStyles.login_container}>
        <div className={loginStyles.login_title}>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            loading="lazy"
          />
        </div>
        <div className={loginStyles.login_inputs}>
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="key"
                onChange={onChangeHandler}
                value={data.key}
                type="text"
                placeholder="Admin Registration Key"
                required
              />
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <div className={loginStyles.password_holder}>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
              required
            />
            <img
              loading="lazy"
              className={`${isDark ? "invert" : ""}`}
              src={showPass ? assets.show_pass : assets.hide_pass}
              onClick={() => setShowPass(!showPass)}
            />
          </div>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className={loginStyles.login_condition}>
          {currState === "Login" ? (
            <p>Only Approved Administrators May Login.</p>
          ) : (
            <p>Registration requires a valid admin key for access.</p>
          )}
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
