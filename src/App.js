import React, { useState } from 'react'
import './App.css'
import Navbar from './container/Navbar'
import TaskManager from './container/TaskManager'

const App = () => {
  const[data,setData] = useState();
  return (
    <div className='container'>
      <Navbar  />
      <TaskManager  />
    </div>
  )
}

export default App
