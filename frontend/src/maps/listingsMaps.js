import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "./MarkerClusterGroup";
import L from "leaflet";

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
          <div className="col">
            <MapContainer
              style={{ height: "100vh"}}
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
                      <b>
                        {listing.name} | Location: {listing.neighbourhood}
                      </b>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;
