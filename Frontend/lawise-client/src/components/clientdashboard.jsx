import React, { useState } from 'react';

const ClientDashboard = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedProblem, setSelectedProblem] = useState('');

    const legalProblems = [
        'Contract Disputes',
        'Personal Injury',
        'Family Law',
        'Criminal Defense',
        'Real Estate Issues',
        'Employment Law',
        'Intellectual Property',
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Profile Section */}
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg m-4">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Profile</h2>
                <div className="flex flex-col items-center mb-6">
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        className="border p-2 rounded mb-2 cursor-pointer"
                    />
                    {profilePic && (
                        <img 
                            src={profilePic} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full border-2 border-blue-400" 
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border p-2 rounded w-full"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="border p-2 rounded w-full"
                        placeholder="Enter your phone number"
                    />
                </div>
            </div>

            {/* Search Section */}
            <div className="w-3/4 p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Legal Problems</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <input 
                        type="text" 
                        className="border p-2 rounded w-full mb-4" 
                        placeholder="Search for legal problems..."
                    />
                    <select 
                        value={selectedProblem} 
                        onChange={(e) => setSelectedProblem(e.target.value)} 
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select a problem...</option>
                        {legalProblems.map((problem, index) => (
                            <option key={index} value={problem}>{problem}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
