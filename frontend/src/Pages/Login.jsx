import React, { useState, useEffect, useContext } from "react";
import loginStyles from "./Css/Login.module.css";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Common/Title/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { token, setToken, backendUrl, isDark, navigate } =
    useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setEmail("");
          setName("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={loginStyles.login}>
      <div className={loginStyles.content_holder}>
        <div className={loginStyles.login_left}>
          <img src={assets.login_img}loading="lazy" />
        </div>
        <div className={loginStyles.login_right}>
          <div className={loginStyles.logo_holder}>
            <img loading="lazy"
              src={assets.logo_black}
              className={`${isDark ? "invert" : ""}`}
            />
            {currentState === "Login" ? (
              <Title text1={"Login"} text2={"In"} />
            ) : (
              <Title text1={"Sign"} text2={"Up"} />
            )}
          </div>
          <form className={loginStyles.input_box} onSubmit={submitHandler}>
            {currentState === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={loginStyles.password_holder}>
              <input
                type={`${showPass ? "text" : "password"}`}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPass ? (
                <img
                loading="lazy"
                  src={assets.show_pass}
                  className={`${isDark ? "invert" : ""}`}
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <img
                loading="lazy"
                  className={`${isDark ? "invert" : ""}`}
                  src={assets.hide_pass}
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            <button type="submit">
              {currentState === "Login" ? "Login" : "Sign Up"}
            </button>
            <div className={loginStyles.policy_holder}>
              <input type="checkbox" required />
              <p>By continuing, i agree to the term of use & privacy policy</p>
            </div>
          </form>
          <div className={loginStyles.toggler_holder}>
            {currentState === "Login" ? (
              <p onClick={() => setCurrentState("Sign Up")}>
                New on our platform? <span> Create Account</span>
              </p>
            ) : (
              <p onClick={() => setCurrentState("Login")}>
                Already with us? <span> Login here</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
