import { useState } from "react";
import APIService from "./Components/APIService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Slider, Radio, RadioGroup, } from 'rsuite'
import 'rsuite/dist/rsuite.min.css';

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
    if(neighbourhood === "Menlo Park") {setCityPrice(23)}
    else if(neighbourhood === "Sunnyvale") {setCityPrice(31)}
    else if(neighbourhood === "Saratoga") {setCityPrice(51)}
    else if(neighbourhood === "Palo Alto") {setCityPrice(56)}
    else if(neighbourhood === "San Francisco") {setCityPrice(76)}
    else if(neighbourhood === "Los Gatos") {setCityPrice(52)}
    else if(neighbourhood === "Mountain View") {setCityPrice(58)}
    else if(neighbourhood === "Los Altos") {setCityPrice(153)}
    else if(neighbourhood === "Saratoga") {setCityPrice(48)}
    else if(neighbourhood === "Cupertino") {setCityPrice(43)}
    else if(neighbourhood === "Gilroy") {setCityPrice(41)}
    else {setCityPrice(0)}
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    InsertPredictValues();
    //setTitle("");
    //setBody("");
  };



  return (
    <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',height: '100vh',}}>
    <div style={{display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',}}>


      <form onSubmit={handleSubmit}>
        <label htmlFor="price-predictor" className="form-label" />
        <Form.Select
          value={neighbourhood}
          onChange={(e) => {setNeighbourhood(e.target.value);} }
          aria-label="Default select example"
        >
          <option>Neighbourhood</option>
          <option value="Menlo Park">Menlo Park</option>
          <option value="Sunnyvale">Sunnyvale</option>
          <option value="Palo Alto">Palo Alto</option>
          <option value="San Jose">San Jose</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Saratoga">Saratoga</option>
          <option value="Los Gatos">Los Gatos</option>
          <option value="Mountain View">Mountain View</option>
          <option value="Los Altos">Los Altos</option>
          <option value="Cupertino">Cupertino</option>
          <option value="Gilroy">Gilroy</option>
        </Form.Select>

        

      <label> Guests: {guests}</label>
        <Slider
      progress
      defaultValue={1}
      onChange={value => {
        setGuests(value)
      }}
      min={1}
      max={64}
    />
    <hr/>
    <label> Bathrooms: {bathrooms} </label>
        <Slider
      progress
      defaultValue={1}
      onChange={value => {
        setBathrooms(value)
      }}
      min={1}
      max={12}
    />
    <hr/>
    <label> Accommodates: {accommodates}</label>
        <Slider
      progress
      defaultValue={1}
      onChange={value => {
        setAccommodates(value)
      }}
      min={1}
      max={64}
    />
    <hr/>
    <label> Bedrooms: {bedrooms}</label>
        <Slider
      progress
      defaultValue={1}
      onChange={value => {
        setBedrooms(value)
      }}
      min={1}
      max={12}
    />
    <hr/>
    <label> Beds: {beds} </label>
        <Slider
      progress
      defaultValue={1}
      onChange={value => {
        setBeds(value)
      }}
      min={1}
      max={24}
    />
    <hr/>
    <label> Cancellation policy </label>
    <RadioGroup name="radioList" inline>
      <Radio value="flexible" onChange={value => {
        setCancellationPolicy(value)
      }}>flexible</Radio>
      <Radio value="moderate"onChange={value => {
        setCancellationPolicy(value)
      }}>moderate</Radio>
      <Radio value="strict"onChange={value => {
        setCancellationPolicy(value)
      }}>strict</Radio>
    </RadioGroup>
        
    <hr/>
    <label> Property type </label>
    <RadioGroup name="radioList" inline>
      <Radio value="Apartment" onChange={value => {
        setPropertyType(value)
      }}>Apartment</Radio>
      <Radio value="House"onChange={value => { setPropertyType(value)}}>
        House</Radio>
        <Radio value="Boat" onChange={value => { setPropertyType(value)
      }}>Boat</Radio>
      <Radio value="Loft" onChange={value => { setPropertyType(value)
      }}>Loft</Radio>
    </RadioGroup>
       
    <hr/>
    <label> Room type </label>
    <RadioGroup name="radioList" inline>
      <Radio value="Private room" onChange={value => {
        setRoomType(value)
      }}>Private room</Radio>
      <Radio value="Entire home/apt"onChange={value => { setRoomType(value)}}>
      Entire home/apt</Radio>
    </RadioGroup>

        <button className="btn btn-primary mt-2">Predict Price</button>
      </form>
    </div>
    
    <a style={{ fontWeight: 'bold', fontSize: 50}}>Predicted price: {price+cityPrice}</a>
    </div>
  );
};

export default PricePredictor;
