import { useState } from "react";
import APIService from "./Components/APIService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PricePredictor = (props) => {
  const [title, setTitle] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [guests, setGuests] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [accommodates, setAccommodates] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [beds, setBeds] = useState("");
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
    <div>
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
        <input
          type="text"
          className="form-control"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Accomodates"
          value={accommodates}
          onChange={(e) => setAccommodates(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <Form.Select
          value={cancellation_policy}
          onChange={(e) => setCancellationPolicy(e.target.value)}
          aria-label="Default select example"
        >
          <option>Cancellation Policy</option>
          <option value="flexible">flexible</option>
          <option value="moderate">moderate</option>
          <option value="strict">strict</option>
        </Form.Select>

        <Form.Select
          value={property_type}
          onChange={(e) => setPropertyType(e.target.value)}
          aria-label="Default select example"
        >
          <option>Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Boat">Boat</option>
          <option value="Loft">Loft</option>
        </Form.Select>

        <Form.Select
          value={room_type}
          onChange={(e) => setRoomType(e.target.value)}
          aria-label="Default select example"
        >
          <option>Room Type</option>
          <option value="Private room">Private room</option>
          <option value="Entire home/apt">Entire home/apt</option>
        </Form.Select>

        <button className="btn btn-primary mt-2">Publish </button>
      </form>
      <a>price: {price+cityPrice}</a>
    </div>
  );
};

export default PricePredictor;
