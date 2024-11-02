import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="admin-welcome">
      <div className="background-animation">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="circle-bg"></div>
        ))}
      </div>
      <div className="content">
        <h1 className="welcome-text">Welcome, Admin!</h1>
        <p className="subtitle">Your command center awaits</p>
        <span >← Select Options</span>
      </div>
    </div>
  );
};

export default Home;
