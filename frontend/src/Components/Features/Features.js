import React from "react";
import "./Features.css";
import Picture5 from "../../assets/Picture5.png";
import Picture6 from "../../assets/Picture6.png";
import Picture7 from "../../assets/Picture7.png";
import Feature from "./Feature/Feature";

export default function Features() {
  const Datalink = (
    <a href="http://insideairbnb.com/get-the-data/">
      Inside Airbnb: Get the Data
    </a>
  );

  let feature_content = {
    item_1: {
      id: 1,

      heading: "+ Data Collection",
      list: {
        desc_1: "We are using initial data provided by Inside AirBnB",
        desc_2:
          "Upon further development, self data automatic cleaning & collecting methods will be.",
      },
    },

    item_2: {
      id: 2,
      heading: "+ Preprocessing",
      list: {
        desc_1: "Feature Selection ",
        desc_2: "Feature Engineering",
        desc_3:
          "Imputing Blank Values (NaN) with Mean value Corresponding feature values",
        desc_4: "Removing Outliers",
      },
    },
    item_3: {
      id: 3,
      image: Picture5,
      heading: "Algorithms Used",
      list: {
        desc_1: "Linear Regression",
        desc_2: "SGD Regression",
        desc_3: "Ridge Regression",
        desc_4: "Lasso Regression",
        desc_5: "Bayesian Regression",
      },
    },
    item_4: {
      id: 4,
      heading: "+ Evaluations",
      list: {
        desc_1: "Initial Training/Test split (80/20)",
        desc_2: "Stratified K-fold Evaluation",
        desc_3: "Mean Absolute Error (MAE) is calculated",
      },
    },
  };

  return (
    <section id="features">
      <h1 className="title">Project Introduction</h1>
      <Feature item={feature_content.item_1} right />
      <Feature item={feature_content.item_2} left />
      <Feature item={feature_content.item_3} right />
      <Feature item={feature_content.item_4} left />
    </section>
  );
}
