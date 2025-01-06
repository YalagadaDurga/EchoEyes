import React, { useState } from 'react';
import '../styles/ReportPage.css';

const ReportPage = () => {
    const [problemType, setProblemType] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReport = {
            name,
            mobile,
            uploadedImage,
            location,
        };

        // Save reports by problemType key
        const existingReports = JSON.parse(localStorage.getItem(problemType)) || [];
        existingReports.push(newReport);
        localStorage.setItem(problemType, JSON.stringify(existingReports));

        alert('Report submitted successfully!');
        // Clear form fields
        setName('');
        setMobile('');
        setUploadedImage(null);
        setLocation('');
        setProblemType('');
    };

    return (
        <div className="report-page-container">
            <h1>Report a Problem</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Your Details</h3>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                </div>

                <div className="form-section">
                    <h3>What is the problem faced?</h3>
                    <select
                        value={problemType}
                        onChange={(e) => setProblemType(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select a problem --
                        </option>
                        <option value="water">Water Problem</option>
                        <option value="road">Roads</option>
                        <option value="clean">Cleanliness</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-section">
                    <h3>Upload Image</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {uploadedImage && (
                        <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="preview-image"
                        />
                    )}
                </div>

                <div className="form-section">
                    <h3>Enter Location</h3>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReportPage;
