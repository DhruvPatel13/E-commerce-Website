import React from "react";
import spinnerStyles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={spinnerStyles.container}>
      <div className={spinnerStyles.spinner_wrapper}>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
      </div>
      <p className={spinnerStyles.text}>Loading Website</p>
    </div>
  );
};

export default Spinner;
