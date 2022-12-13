import { useState } from "react";
import APIService from "../Components/APIService";
import Form from "react-bootstrap/Form";
import {
  Slider,
  Radio,
  RadioGroup,
  InputPicker,
  Popover,
  Whisper,
  Button,
} from "rsuite";
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

  const [annualRevenue, setAnnualRevenue] = useState(0);

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
        setPrice(response["price"]);
      })
      .then(() => {
        setCityTax();
        setAnnualRevenue(avgBookings[neighbourhood] * (price + cityPrice));
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
    var annualRev = avgBookings[neighbourhood] * (price + cityPrice);
    setAnnualRevenue(annualRev);
    //setBody("");
  };

  return (
    <div className="BgWaves">
      <div style={{ display: "flex" }}>
        <span
          style={{ float: "right", marginTop: "300px", marginLeft: "120px" }}
        >
          <a style={{ fontWeight: "bold", fontSize: 50, color: "white" }}>
            <text>
              Predicted price: ${(price + cityPrice).toFixed(2)}
              <hr /> Predicted Annual Revenue: $
              {(avgBookings[neighbourhood] * (price + cityPrice)).toFixed(2) ===
                "NaN" && (0.0).toFixed(2)}
              {(avgBookings[neighbourhood] * (price + cityPrice)).toFixed(2) !==
                "NaN" && (annualRevenue * 4).toFixed(2)}
            </text>
          </a>
        </span>

        <span style={{}} className="featureBox1">
          <div style={{}}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="price-predictor" className="form-label" />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputPicker
                  value={neighbourhood}
                  onChange={(n) => setNeighbourhood(n)}
                  data={cities}
                  style={{
                    width: 224,
                    display: "flex",
                  }}
                />
                <Whisper
                  followCursor
                  speaker={<Popover>The city your property is in.</Popover>}
                >
                  <Button> City</Button>
                </Whisper>
              </div>

              <hr />

              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Whisper
                  followCursor
                  speaker={
                    <Popover>
                      Maximum amount of people allowed as guests in the
                      property.
                    </Popover>
                  }
                >
                  <Button> Guests: {guests}</Button>
                </Whisper>
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
                <Whisper
                  followCursor
                  speaker={
                    <Popover>The amount of bedrooms in the home</Popover>
                  }
                >
                  <Button> Bedrooms: {bedrooms}</Button>
                </Whisper>
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
                <Whisper
                  followCursor
                  speaker={
                    <Popover>The amount of beds your property has.</Popover>
                  }
                >
                  <Button> Beds: {beds}</Button>
                </Whisper>
                <Slider
                  progress
                  defaultValue={1}
                  onChange={(value) => {
                    setBeds(value);
                  }}
                  min={1}
                  max={24}
                />
                <hr />

                <Whisper
                  followCursor
                  speaker={
                    <Popover>
                      The amount of bathrooms your property has.
                    </Popover>
                  }
                >
                  <Button> Bathrooms: {bathrooms}</Button>
                </Whisper>
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

                <Whisper
                  followCursor
                  speaker={
                    <Popover>
                      How many people can sleep inside your property?.
                    </Popover>
                  }
                >
                  <Button> Accommodates: {accommodates} </Button>
                </Whisper>
                <Slider
                  progress
                  defaultValue={1}
                  onChange={(value) => {
                    setAccommodates(value);
                  }}
                  min={1}
                  max={64}
                />
              </div>
              <hr />
              <Whisper
                followCursor
                speaker={
                  <Popover>
                    How strict will you be with the cancellation policy?
                  </Popover>
                }
              >
                <Button> Cancellation Policy</Button>
              </Whisper>
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
              <Whisper
                followCursor
                speaker={<Popover>What type of property is it?</Popover>}
              >
                <Button> Property type </Button>
              </Whisper>
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
              <Whisper
                followCursor
                speaker={<Popover>What type of room is it?</Popover>}
              >
                <Button> Room type </Button>
              </Whisper>
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
    </div>
  );
};

export default PricePredictor;
