import React, { useState } from "react";

import TaskManager from "./container/TaskManager";
import Navbar from "./container/Navbar";

const App = () => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => setTheme(prevTheme => !prevTheme);

  return (
    <div style={{ backgroundColor: theme ? "black" : "#dddbff", color: theme ? "white" : "black", minHeight: "100vh" }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <TaskManager theme={theme} />
    </div>
  );
};

export default App;
