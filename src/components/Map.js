import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [issues, setIssues] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center

  useEffect(() => {
    axios.get('http://localhost:8080/api/issues') // Backend API URL
      .then(response => {
        setIssues(response.data);
        // Set the map center to the first issue's coordinates
        if (response.data.length > 0) {
          setMapCenter([response.data[0].latitude, response.data[0].longitude]);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the issues!', error);
      });
  }, []);

  return (
    <div className="container">
      <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {issues.map((issue) => (
          <Marker key={issue.id} position={[issue.latitude, issue.longitude]}>
            <Popup>
              <strong>{issue.title}</strong><br />
              {issue.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
