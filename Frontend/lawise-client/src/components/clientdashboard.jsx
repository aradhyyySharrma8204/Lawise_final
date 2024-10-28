import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [personalDetails, setPersonalDetails] = useState({});
    const [caseReport, setCaseReport] = useState('');
    const [legalProblem, setLegalProblem] = useState('');
    const [greeting, setGreeting] = useState('');

    const legalIssues = [
        "Divorce",
        "Contract Issues",
        "Property Disputes",
        "Criminal Defense",
        "Employment Issues",
        // Add more issues as needed
    ];

    // Greeting based on time of day
    useEffect(() => {
        const currentHour = new Date().getHours();
        let greetingMessage = 'Hello!';
        if (currentHour < 12) {
            greetingMessage = 'Good Morning!';
        } else if (currentHour < 18) {
            greetingMessage = 'Good Afternoon!';
        } else {
            greetingMessage = 'Good Evening!';
        }
        setGreeting(greetingMessage);
        
        // Fetch user info from the database (you can adjust this URL and logic as per your backend)
        const fetchUserInfo = async () => {
            const response = await axios.get('http://localhost:5000/api/user-info'); // Adjust the endpoint accordingly
            setName(response.data.name);
            setProfileImage(response.data.profileImage); // Assuming the response has these fields
            setPhone(response.data.phone); // Assuming the response has these fields
        };

        fetchUserInfo();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                // Optionally, send the new image to your backend
                axios.put('http://localhost:5000/api/update-profile', {
                    name,
                    profileImage: reader.result, // Sending the updated image to backend
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePersonalDetailsSubmit = async (e) => {
        e.preventDefault();
        // Save personal details to MongoDB
        await axios.post('http://localhost:5000/api/personal-details', personalDetails);
        alert('Personal details saved successfully!');
    };

    const handleCaseReportSubmit = async (e) => {
        e.preventDefault();
        // Submit case report to MongoDB
        await axios.post('http://localhost:5000/api/case-report', {
            name,
            phone,
            caseReport,
        });
        alert('Case report submitted successfully!');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6">
            {/* Profile Section */}
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{greeting} {name}</h2>
                <div className="flex flex-col items-center mb-4">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-2"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-300 mb-2"></div>
                    )}
                    <h3 className="text-xl">{name}</h3>
                    <p className="text-gray-600">{phone}</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 mb-4"
                    />
                    <button
                        onClick={() => setName(prompt('Enter your name:', name))}
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Edit
                    </button>
                </div>

                <button
                    onClick={() => document.getElementById('personalDetailsForm').classList.toggle('hidden')}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 mb-4"
                >
                    Fill Personal Details
                </button>

                {/* Personal Details Form */}
                <form id="personalDetailsForm" className="hidden" onSubmit={handlePersonalDetailsSubmit}>
                    <input
                        type="text"
                        placeholder="Address"
                        onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Date of Birth"
                        onChange={(e) => setPersonalDetails({ ...personalDetails, dob: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                    >
                        Save Details
                    </button>
                </form>

                <button
                    onClick={() => document.getElementById('caseReportForm').classList.toggle('hidden')}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    Submit Case Report
                </button>

                {/* Case Report Form */}
                <form id="caseReportForm" className="hidden" onSubmit={handleCaseReportSubmit}>
                    <textarea
                        placeholder="Describe your case..."
                        value={caseReport}
                        onChange={(e) => setCaseReport(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                    >
                        Submit Report
                    </button>
                </form>
            </div>

            {/* Search Bar Section */}
            <div className="w-full md:w-2/3 p-6">
                <h2 className="text-2xl font-bold mb-4">Search for Legal Problems</h2>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search for legal issues..."
                        className="w-full p-2 border border-gray-300 rounded mb-4 md:mr-4"
                    />
                    <select
                        value={legalProblem}
                        onChange={(e) => setLegalProblem(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a legal problem</option>
                        {legalIssues.map((issue) => (
                            <option key={issue} value={issue}>{issue}</option>
                        ))}
                    </select>
                    <button
                        className="ml-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
