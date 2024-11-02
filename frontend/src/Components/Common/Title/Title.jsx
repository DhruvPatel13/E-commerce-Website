import React from "react";
import titleStyles from "./Title.module.css";

const Title = ({ text1, text2, line = true }) => {
  return (
    <div className={titleStyles.title}>
      <h2>
        <span>{text1} </span>
        {text2 && text2}
      </h2>
      {line ? <div className={titleStyles.line}></div> : <></>}
    </div>
  );
};

export default Title;
