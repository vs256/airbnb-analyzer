
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "./MarkerClusterGroup";
import L from "leaflet";
import avgBookings from "./cities_avgBookings.json";


import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

import listings from "./santa-clara-county-airbnb-listings.json";

const markerIcon = new L.Icon({
  iconUrl: require("./resources/images/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: 37.45789, lng: -122.15462 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2>AirBnb Listings Map Analyzer</h2>
          <p>Analyze different listings in the surrounding location.</p>
          <div className="featureBox1">
            <div className="col ">
              <MapContainer
                style={{ height: "100vh" }}
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
              >
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />

                <MarkerClusterGroup>
                  {listings.map((listing, idx) => (
                    <Marker
                      position={[listing.latitude, listing.longitude]}
                      icon={markerIcon}
                      key={idx}
                    >
                      <Popup>
                        <b>{listing.name} </b> <hr />{" "}
                        <b> Location: {listing.neighbourhood}</b> <hr />{" "}
                        <b> Price: {listing.price}</b> <hr />{" "}
                        <b>
                          {" "}
                          <a href={listing.listing_url}>Airbnb link</a>
                        </b>
                        <b>
                          {" "}
                          Predicted Annual Revenue:{" "}
                          {avgBookings[listing.neighbourhood.split(",")[0]] *
                            listing.price.substring(1)}
                        </b>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;
