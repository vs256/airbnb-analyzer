import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="for_BG">
        <div id="top_section">
          <div className="container">
            <div className="main_content">
              <h1 className="text-center text-white font-weight-bold">
                AirBnb Profitability Predictor <br />

              </h1>

              <div className="text-center text-white my-3 font-weight-light descriptionx">
                Predicts how profitable a future AirBnb listing might be based on previous listings
              </div>
              <div className="text-center text-white my-2 smallx ">
                <br />
                <Link to="/APP" >
                  <button
                    type="text"
                    className="text-center my-5 free_btn font-weight-light"
                  >
                    TRY IT NOW!!
                </button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
