import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PricePredictor from "./Features/PricePredictor";
import ListingsMaps from "./Features/maps/listingsMaps";

function App() {
  const [getMessage, setGetMessage] = useState({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/flask/hello")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{}} className="App">
      <PricePredictor />
    <hr/>
      <ListingsMaps />
    </div>
  );
}

export default App;
