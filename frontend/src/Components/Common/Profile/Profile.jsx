import React, { useState, useEffect, useContext } from "react";
import profileStyles from "./Profile.module.css";
import Title from "../Title/Title";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, backendUrl, isDark } = useContext(ShopContext);
  const [showPass, setShowPass] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  useEffect(() => {
    const getUserCredentials = async () => {
      const { data } = await axios.get(backendUrl + "/api/user/details", {
        headers: { token },
      });
      if (data.success) setUserDetails(data.user);
    };
    getUserCredentials();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      backendUrl + "/api/user/changepass",
      {
        email: userDetails.email,
        password,
        newPassword,
      },
      {
        headers: { token },
      }
    );
    if (data.success) {
      setPassword("");
      setNewPassword("");
      return toast.success(data.message);
    }
  };

  return (
    <div className={profileStyles.holder}>
      <Link to={"/"} className={profileStyles.back_btn}>
        <img src={assets.dropdown_black} className={`${isDark ? "invert" : ""}`} loading="lazy"/>
        <p>Back</p>
      </Link>
      <Title text1={"MY"} text2={"PROFILE"} />
      <form onSubmit={submitHandler} className={profileStyles.profile_content}>
        <div className={profileStyles.input_holder}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" readOnly value={userDetails.name} />
        </div>
        <div className={profileStyles.input_holder}>
          <label htmlFor="email">Your E-mail</label>
          <input type="text" id="email" readOnly value={userDetails.email} />
        </div>
        <div className={profileStyles.input_holder}>
          <label htmlFor="pass">Your Old/Current Password</label>
          <input
            type={showPass ? "text" : "password"}
            id="pass"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
          loading="lazy"
            src={showPass ? assets.show_pass : assets.hide_pass}
            onClick={() => setShowPass(!showPass)}
            className={`${isDark ? "invert" : ""}`}
          />
        </div>
        <div className={profileStyles.input_holder}>
          <label htmlFor="newPass">Your New Password</label>
          <input
            type={showPass ? "text" : "password"}
            id="newPass"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img
          loading="lazy"
            src={showPass ? assets.show_pass : assets.hide_pass}
            onClick={() => setShowPass(!showPass)}
            className={`${isDark ? "invert" : ""}`}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
