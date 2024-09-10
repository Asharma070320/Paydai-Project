import React from "react";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className="nav_container" style={{ backgroundColor: theme ? "black" : "#dddbff", color: theme ? "white" : "black" }}>
      <i>Paydai</i>
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
