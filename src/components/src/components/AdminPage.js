import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/AdminPage.css'

const AdminPage = () => {
    const location = useLocation();
    const { problemType } = location.state || {};
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const storedReports = JSON.parse(localStorage.getItem(problemType)) || [];
        setReports(storedReports);
    }, [problemType]);

    const handleComplete = (index) => {
        const updatedReports = reports.filter((_, i) => i !== index);
        setReports(updatedReports);
        localStorage.setItem(problemType, JSON.stringify(updatedReports));
    };

    return (
        <div className="admin-page-container">
            <h1>Admin Dashboard - {problemType?.charAt(0).toUpperCase() + problemType?.slice(1)} Problems</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone Number</th>
                        <th>Image</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.name}</td>
                            <td>{report.mobile}</td>
                            <td>
                                {report.uploadedImage ? (
                                    <img
                                        src={report.uploadedImage}
                                        alt="Uploaded"
                                        style={{ width: "100px" }}
                                    />
                                ) : (
                                    <img
                                        src={report.capturedImage}
                                        alt="Captured"
                                        style={{ width: "100px" }}
                                    />
                                )}
                            </td>
                            <td>{report.location}</td>
                            <td>
                                <button
                                    onClick={() => handleComplete(index)}
                                    className="complete-btn"
                                >
                                    Completed
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
