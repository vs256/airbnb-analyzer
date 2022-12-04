import { useState } from "react";
import APIService from "../Components/APIService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Slider, Radio, RadioGroup, InputPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import avgBookings from "./maps/cities_avgBookings.json";

const PricePredictor = (props) => {
  const [title, setTitle] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [guests, setGuests] = useState(4);
  const [bathrooms, setBathrooms] = useState(1);
  const [accommodates, setAccommodates] = useState(4);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [cancellation_policy, setCancellationPolicy] = useState("");
  const [property_type, setPropertyType] = useState("");
  const [room_type, setRoomType] = useState("");

  const [price, setPrice] = useState(0);

  const [cityPrice, setCityPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const cities = [
    "Menlo Park",
    "Sunnyvale",
    "Palo Alto",
    "San Jose",
    "San Francisco",
    "Saratoga",
    "Los Gatos",
    "Mountain View",
    "Los Altos",
    "Cupertino",
    "Gilroy",
  ].map((item) => ({ label: item, value: item }));

  const InsertPredictValues = () => {
    APIService.InsertPredictValues({
      neighbourhood,
      guests,
      bathrooms,
      accommodates,
      bedrooms,
      beds,
      cancellation_policy,
      property_type,
      room_type,
    })
      .then((response) => {
        console.log(response);
        setPrice(response);
        setCityTax();
      })
      .catch((error) => console.log("error", error));
  };

  const setCityTax = () => {
    if (neighbourhood === "Menlo Park") {
      setCityPrice(23);
    } else if (neighbourhood === "Sunnyvale") {
      setCityPrice(31);
    } else if (neighbourhood === "Saratoga") {
      setCityPrice(51);
    } else if (neighbourhood === "Palo Alto") {
      setCityPrice(56);
    } else if (neighbourhood === "San Francisco") {
      setCityPrice(76);
    } else if (neighbourhood === "Los Gatos") {
      setCityPrice(52);
    } else if (neighbourhood === "Mountain View") {
      setCityPrice(58);
    } else if (neighbourhood === "Los Altos") {
      setCityPrice(153);
    } else if (neighbourhood === "Saratoga") {
      setCityPrice(48);
    } else if (neighbourhood === "Cupertino") {
      setCityPrice(43);
    } else if (neighbourhood === "Gilroy") {
      setCityPrice(41);
    } else {
      setCityPrice(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    InsertPredictValues();
    //setTitle("");
    //setBody("");
  };

  return (
    <div className="BgWaves">
      <span style={{ float: "right", marginTop: '300px', marginRight: '120px' }}>
        <a style={{ fontWeight: "bold", fontSize: 50, color: "white" }}>
          <text>
            Predicted price: {price + cityPrice}
            <hr /> Predicted Annual Revenue:{" "}
            {avgBookings[neighbourhood] *
              (price+cityPrice)}
          </text>
        </a>
      </span>

      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className="featureBox1"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="price-predictor" className="form-label" />

            <hr />
            <label> City </label>
            <InputPicker
              value={neighbourhood}
              onChange={(n) => setNeighbourhood(n)}
              data={cities}
              style={{
                width: 224,
                display: "flex",
              }}
            />

            <hr />

            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <label> Guests: {guests}</label>
              <Slider
                progress
                defaultValue={1}
                onChange={(value) => {
                  setGuests(value);
                }}
                min={1}
                max={64}
              />
              <hr />
              <label> Bathrooms: {bathrooms} </label>
              <Slider
                progress
                defaultValue={1}
                onChange={(value) => {
                  setBathrooms(value);
                }}
                min={1}
                max={12}
              />
              <hr />
              <label> Accommodates: {accommodates}</label>
              <Slider
                progress
                defaultValue={1}
                onChange={(value) => {
                  setAccommodates(value);
                }}
                min={1}
                max={64}
              />
              <hr />
              <label> Bedrooms: {bedrooms}</label>
              <Slider
                progress
                defaultValue={1}
                onChange={(value) => {
                  setBedrooms(value);
                }}
                min={1}
                max={12}
              />
              <hr />
              <label> Beds: {beds} </label>
              <Slider
                progress
                defaultValue={1}
                onChange={(value) => {
                  setBeds(value);
                }}
                min={1}
                max={24}
              />
            </div>
            <hr />
            <label> Cancellation policy </label>
            <RadioGroup name="radioList" inline>
              <Radio
                value="flexible"
                onChange={(value) => {
                  setCancellationPolicy(value);
                }}
              >
                flexible
              </Radio>
              <Radio
                value="moderate"
                onChange={(value) => {
                  setCancellationPolicy(value);
                }}
              >
                moderate
              </Radio>
              <Radio
                value="strict"
                onChange={(value) => {
                  setCancellationPolicy(value);
                }}
              >
                strict
              </Radio>
            </RadioGroup>

            <hr />
            <label> Property type </label>
            <RadioGroup name="radioList" inline>
              <Radio
                value="Apartment"
                onChange={(value) => {
                  setPropertyType(value);
                }}
              >
                Apartment
              </Radio>
              <Radio
                value="House"
                onChange={(value) => {
                  setPropertyType(value);
                }}
              >
                House
              </Radio>
              <Radio
                value="Boat"
                onChange={(value) => {
                  setPropertyType(value);
                }}
              >
                Boat
              </Radio>
              <Radio
                value="Loft"
                onChange={(value) => {
                  setPropertyType(value);
                }}
              >
                Loft
              </Radio>
            </RadioGroup>

            <hr />
            <label> Room type </label>
            <RadioGroup name="radioList" inline>
              <Radio
                value="Private room"
                onChange={(value) => {
                  setRoomType(value);
                }}
              >
                Private room
              </Radio>
              <Radio
                value="Entire home/apt"
                onChange={(value) => {
                  setRoomType(value);
                }}
              >
                Entire home/apt
              </Radio>
            </RadioGroup>

            <button className="btn btn-primary mt-2">Predict Price</button>
          </form>
        </div>
      </span>
    </div>
  );
};

export default PricePredictor;
