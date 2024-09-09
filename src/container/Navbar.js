import React, { useState } from "react";
import "./Navbar.css";

const Navbar = (props) => {
    const[theme,setTheme] = useState(false);
    const check = (e) => {
        setTheme(e.target.checked);
    }
    
    
    
  return (
    <div className="nav_container" style={{backgroundColor: theme ? "black":"#dddbff",color: theme ? "white":"black"}}>
      <h2>Paydai</h2>
      <div></div>
      <div className="toggleBtn">
        <h4>Light</h4>
        <input type="checkbox" onChange={check} className="theme-checkbox"></input>
        <h4>Dark</h4>
      </div>
    </div>
  );
};

export default Navbar;
