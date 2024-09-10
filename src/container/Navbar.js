import React from "react";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className="nav_container" style={{ backgroundColor: theme ? "#2a2828" : "#dddbff", color: theme ? "white" : "black" }}>
      <i>Paydai</i>
      <div></div>
      <div className="toggleBtn">
      <i class="ri-sun-fill"></i>
        <input type="checkbox" checked={theme} onChange={toggleTheme} className="theme-checkbox" />
        <i class="ri-moon-fill"></i>
      </div>
    </div>
  );
};

export default Navbar;
