import React from "react";
import Features from "../Components/Features/Features";
import Market from "../Components/Market/Market";
import Footer from "../Components/Footer/Footer";
import Trial from "../Components/Trial/Trial";
import Laptop from "../Components/Laptop/Laptop";
import Homex from "../Components/Home/Home";
import Brands from "../Components/Brands/Brands";

const Home = () => {
  return (
    <div>
      <Homex />
      {/* <Laptop /> */}
      <Features />
      <Market />
      <Brands />
      <Trial />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
