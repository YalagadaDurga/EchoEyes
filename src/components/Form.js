import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        latitude: 0,
        longitude: 0,
        image: null,
        userEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('latitude', formData.latitude);
        data.append('longitude', formData.longitude);
        data.append('image', formData.image);
        data.append('userEmail', formData.userEmail);

        try {
            const response = await axios.post('http://localhost:8080/api/issues', data);
            alert('Issue reported successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error reporting issue:', error.response?.data || error.message);
            alert('Failed to report the issue. Please try again.');
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setFormData({
                    ...formData,
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
            },
        });

        return formData.latitude && formData.longitude ? (
            <Marker position={[formData.latitude, formData.longitude]} />
        ) : null;
    };

    return (
        <div className="container">
            <h1>Report an Issue</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <label>User Email:</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        readOnly
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        readOnly
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <h2>Select Location on Map</h2>
            <MapContainer
                center={[20.5937, 78.9629]} // Default center (India)
                zoom={5}
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default Form;
