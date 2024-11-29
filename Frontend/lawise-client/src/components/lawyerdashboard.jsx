import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LawyerDashboard = () => {
    const [greeting, setGreeting] = useState('');
    const [emoji, setEmoji] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [lawyerInfo, setLawyerInfo] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        address: '',
        caseCategory: '',
        uploadedPhoto: null,
    });
    const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState(null);
    const [profilePic, setProfilePic] = useState('');
    const [clients, setClients] = useState([]);
    const [caseCategory, setCaseCategory] = useState('');
    const [caseCategories, setCaseCategories] = useState([
        'Corporate Law',
        'Family Law',
        'Criminal Defense',
    ]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good Morning");
            setEmoji("🌞");
        } else if (hour < 18) {
            setGreeting("Good Afternoon");
            setEmoji("☀️");
        } else {
            setGreeting("Good Evening");
            setEmoji("🌜");
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLawyerInfo({ ...lawyerInfo, [name]: value });
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
            alert('Please upload a JPEG or PNG image.');
            return;
        }
        setUploadedPhotoPreview(URL.createObjectURL(file));
        setLawyerInfo({ ...lawyerInfo, uploadedPhoto: file });
    };

    const handlePDFUpload = (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please upload a PDF document.');
            return;
        }
        setLawyerInfo({ ...lawyerInfo, caseDetailsPDF: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', lawyerInfo.email);
        formData.append('name', lawyerInfo.name);
        formData.append('phoneNumber', lawyerInfo.phoneNumber);
        formData.append('address', lawyerInfo.address);
        formData.append('caseCategory', lawyerInfo.caseCategory);
        formData.append('uploadedPhoto', lawyerInfo.uploadedPhoto);

        try {
            const response = await axios.post('http://localhost:5000/lawyer/lawyerinfo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Lawyer info submitted:', response.data);
            setShowForm(false);
            setLawyerInfo({
                email: '',
                name: '',
                phoneNumber: '',
                address: '',
                caseCategory: '',
                uploadedPhoto: null,
            });
            setUploadedPhotoPreview(null);
        } catch (error) {
            console.error("Error submitting lawyer info:", error);
        }
    };

    const handleProfilePicUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                alert('Please upload a JPEG or PNG image.');
                return;
            }
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const fetchClients = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/clients/${category}`);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleSearchClients = () => {
        if (!lawyerInfo.caseCategory) {
            alert("Please select a case category to search clients.");
            return;
        }

        const apiUrl = `http://localhost:5000/api/clients/${encodeURIComponent(lawyerInfo.caseCategory)}`;
        axios.get(apiUrl)
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error("Error fetching clients:", error);
            });
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setLawyerInfo((prevInfo) => ({
            ...prevInfo,
            caseCategory: selectedCategory,
        }));

        if (selectedCategory) {
            fetchClients(selectedCategory);
        } else {
            setClients([]);
        }
    };

    const handleSearch = () => {
        if (caseCategory) {
            fetchClients(caseCategory);
        } else {
            alert("Please select a case category to search for clients.");
        }
    };


    const handleVideoCall = (clientEmail, clientName) => {
        console.log('Sending video call link to:', clientEmail, clientName); // Log
        axios.post('http://localhost:5000/clients/sendVideoCallLink', {
            clientEmail,
            clientName,
        })
        .then((response) => {
            alert('Video call link sent to client!');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('Failed to send video call link.');
        });
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-100 to-purple-200">
            {/* Left Sidebar - Profile Section */}
            <div className="w-1/4 bg-white flex flex-col items-center py-8 shadow-lg rounded-tr-lg rounded-br-lg">
                <h2 className="text-2xl font-bold text-purple-800 mb-2 animate-pulse">
                    {greeting} {emoji}
                </h2>
                <div
                    className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden mb-4 cursor-pointer"
                    onClick={() => document.getElementById('profilePicInput').click()}
                >
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    id="profilePicInput"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                >
                    Add Lawyer Info
                </button>
            </div>

            {/* Client Search */}
            <div className="my-6 w-full max-w-md mx-auto">
                <select
                    value={lawyerInfo.caseCategory}
                    onChange={handleCategoryChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="" disabled>Select a case category to search clients</option>
                    {caseCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button
                    onClick={handleSearchClients}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
                >
                    Search Clients
                </button>
            </div>

            {/* Display Clients as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
                {clients.map((client) => (
                    <div key={client._id} className="border rounded-md shadow-md p-4 bg-white">
                        <div className="mb-4">
                            <img
                                src={client.uploadedPhoto ? `http://localhost:5000/uploads/${client.uploadedPhoto.split('\\').pop()}` : '/path/to/default-image.jpg'}
                                alt="Client Profile"
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-center">{client.name}</h3>
                        <p className="text-gray-600 text-center">Specialization: {client.caseCategory}</p>
                        <p className="text-gray-600 text-center">Email: {client.email}</p>
                        <p className="text-gray-600 text-center">Contact: {client.phoneNumber}</p>
                        
                        {/* Video Call Button */}
                        <a
                            href="https://meet.google.com/qwx-vjai-eky"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleVideoCall(client.email, client.name)}
                            className="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-lightblue-600"
                        >
                            Video Call
                        </a>
                    </div>
                ))}
            </div>

            {/* Submit Lawyer Info Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Submit Lawyer Information</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={lawyerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={lawyerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={lawyerInfo.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={lawyerInfo.address}
                        onChange={handleInputChange}
                        required
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                    <select
                        name="caseCategory"
                        value={lawyerInfo.caseCategory}
                        onChange={handleInputChange}
                        required
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Select Case Category</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="Family Law">Family Law</option>
                        <option value="Criminal Defense">Criminal Defense</option>
                    </select>

                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        name="uploadedPhoto"
                        onChange={handlePhotoUpload}
                        className="mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default LawyerDashboard;
