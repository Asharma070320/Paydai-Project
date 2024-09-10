import React from "react";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className="nav_container" style={{ backgroundColor: theme ? "#2a2828" : "#dddbff", color: theme ? "white" : "black" }}>
      <img className="setImg" src="https://www.itspaydai.com/assets/logo-DnAxFD0z.svg" alt="paydai_img" />
      <div></div>
      <div className="toggleBtn">
        <h4>Light</h4>
        <input type="checkbox" checked={theme} onChange={toggleTheme} className="theme-checkbox" />
        <h4>Dark</h4>
      </div>
    </div>
  );
};

export default Navbar;
