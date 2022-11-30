import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PricePredictor from './PricePredictor';


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
        <p>Price Predictor</p>

        <PricePredictor/>
      </header>
    </div>
  );
}

export default App;
