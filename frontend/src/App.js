import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const [getMessage, setGetMessage] = useState({})

  React.useEffect(() => { 
    axios.get('http://localhost:5000/flask/hello').then(response => {
    console.log("SUCCESS", response)
    setGetMessage(response)
  }).catch(error => {
    console.log(error)
  })
}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Initial React + Flask</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
