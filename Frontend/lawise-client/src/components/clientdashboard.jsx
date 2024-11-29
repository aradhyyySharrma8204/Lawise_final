import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
    const [greeting, setGreeting] = useState('');
    const [emoji, setEmoji] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [clientInfo, setClientInfo] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        address: '',
        aadharDetails: '',
        legalInfo: '',
        caseDetailsPDF: '',
        caseCategory: '',
        uploadedPhoto: null 
    });
    const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState(null);
    const [profilePic, setProfilePic] = useState(''); 
    const [caseCategories] = useState([
        "Corporate Law",
        "Family Law",
        "Criminal Defense",
        // Add other categories as needed
    ]);
    const [lawyers, setLawyers] = useState([]);

   /* const handleSearchLawyers = () => {
        alert("function handlesearchlawyer tak pahuch chuka hai ")
        if (clientInfo.caseCategory) {
            axios.get(`http://localhost:5000/api/lawyers?category=${clientInfo.caseCategory}`)
                .then(response => {
                    console.log("lawyers fetch ho rhey hai")
                    setLawyers(response.data); // Adjust based on your backend response
                })
                .catch(error => {
                    console.error("Error fetching lawyers:", error);
                });
        }
    };*/

    const handleSearchLawyers = () => {
        alert("Function handleSearchLawyers reached!");
    
        // Check if a case category is selected
        if (!clientInfo.caseCategory) {
            alert("Please select a case category to search lawyers.");
            return; // Early return if no category is selected
        }
    
        // Construct the API URL based on the selected case category
        const apiUrl = `http://localhost:5000/api/lawyers/${encodeURIComponent(clientInfo.caseCategory)}`;
    
        axios.get(apiUrl)
            .then(response => {
                console.log("Lawyers fetched successfully:", response.data);
    
                // Assuming response.data contains the array of lawyers directly
                setLawyers(response.data); // Adjust this if your API response structure is different
    
                // Display the fetched data in alert for verification
                alert("Lawyers fetched: " + JSON.stringify(response.data, null, 2)); // Display fetched data in a readable format
           
            })
            .catch(error => {
                console.error("Error fetching lawyers:", error);
                alert("Error fetching lawyers. Please try again."); // Notify the user
            });
    };
    

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
        setClientInfo({ ...clientInfo, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setClientInfo({ ...clientInfo, caseCategory: value });
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
            alert('Please upload a JPEG or PNG image.');
            return;
        }
        setUploadedPhotoPreview(URL.createObjectURL(file));
        setClientInfo({ ...clientInfo, uploadedPhoto: file });
    };

    const handlePDFUpload = (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please upload a PDF document.');
            return;
        }
        setClientInfo({ ...clientInfo, caseDetailsPDF: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', clientInfo.email);
        formData.append('name', clientInfo.name);
        formData.append('phoneNumber', clientInfo.phoneNumber);
        formData.append('address', clientInfo.address);
        formData.append('aadharDetails', clientInfo.aadharDetails);
        formData.append('legalInfo', clientInfo.legalInfo);
        formData.append('caseCategory', clientInfo.caseCategory);
        formData.append('uploadedPhoto', clientInfo.uploadedPhoto);
        formData.append('caseDetailsPDF', clientInfo.caseDetailsPDF);

        try {
            const response = await axios.post('http://localhost:5000/clientinfo/clientinfo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Client info submitted:', response.data);
            setShowForm(false);
            setClientInfo({
                email: '',
                name: '',
                phoneNumber: '',
                address: '',
                aadharDetails: '',
                legalInfo: '',
                caseCategory: '',
                uploadedPhoto: null
            });
            setUploadedPhotoPreview(null);
        } catch (error) {
            console.error("Error submitting client info:", error);
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

    const LawyerCard = ({ lawyer }) => {
        // Construct the URL for the uploaded photo
        const photoUrl = `http://localhost:5000/api/${lawyer.uploadedPhoto.replace(/\\/g, '/')}`;
    
        return (
            <div className="card">
                <img src={photoUrl} alt={`${lawyer.name}'s profile`} className="card-img" />
                <div className="card-body">
                    <h5 className="card-title">{lawyer.name}</h5>
                    <p className="card-text">{lawyer.email}</p>
                    <p className="card-text">{lawyer.phoneNumber}</p>
                </div>
            </div>
        );
    };
    
    


  //==================================  

    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-100 to-purple-200">
            {/* Left Sidebar - Profile Section */}
            <div className="w-1/4 bg-white flex flex-col items-center py-8 shadow-lg rounded-tr-lg rounded-br-lg">
                <h2 className="text-2xl font-bold text-purple-800 mb-2 animate-pulse">
                    {greeting} {emoji}
                </h2>

                {/* Larger Circular Profile Picture */}
                <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden mb-4 cursor-pointer" onClick={() => document.getElementById('profilePicInput').click()}>
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
                    Add Client Info
                </button>
             
            </div>

            {/* Right Side - Main Dashboard Content */}
            <div className="w-3/4 p-10 flex flex-col">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Client Dashboard</h2>

                {/* Client Info Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit Your Information</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={clientInfo.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={clientInfo.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={clientInfo.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={clientInfo.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="aadharDetails"
                                    placeholder="Aadhar Details"
                                    value={clientInfo.aadharDetails}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="legalInfo"
                                    placeholder="Legal Information"
                                    value={clientInfo.legalInfo}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                />

                                <select
                                    name="caseCategory"
                                    value={clientInfo.caseCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="" disabled>Select Case Category</option>
                                    {caseCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>

                                {/* Photo Upload with Label */}
                                <label className="block mb-1 text-gray-700">Upload Your Photograph:</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handlePhotoUpload}
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {uploadedPhotoPreview && (
                                    <div className="mt-2">
                                        <p className="text-gray-500">Uploaded Image:</p>
                                        <img src={uploadedPhotoPreview} alt="Uploaded Preview" className="w-20 h-20 object-cover" />
                                    </div>
                                )}

                                {/* PDF Upload */}
                                <label className="block mb-1 text-gray-700">Upload Case Details (PDF):</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handlePDFUpload}
                                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Search Bar for Lawyers */}
                <div className="my-6">
                    <select
                        value={clientInfo.caseCategory}
                        onChange={handleCategoryChange}
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Select a case category to search lawyers</option>
                        {caseCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearchLawyers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        
                    >
                        Search Lawyers
                    </button>
                </div>

                {/* Display Lawyers as Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lawyers.map((lawyer) => (
                        <div key={lawyer._id} className="border rounded-md shadow-md p-4">
                
                <div className="mb-4">
                <img 
    src={lawyer.uploadedPhoto ? `http://localhost:5000/uploads/${lawyer.uploadedPhoto.split('\\').pop()}` : '/path/to/default-image.jpg'} 
    alt="Lawyer Profile" 
/>
            </div>
            {console.log('Lawyer Photo Path:', lawyer.uploadedPhoto)
            }
            
                            <h3 className="text-lg font-semibold">{lawyer.name}</h3>
                            <p className="text-gray-600">Specialization: {lawyer.caseCategory}</p>
                            <p className="text-gray-600">Email: {lawyer.email}</p>
                            <p className="text-gray-600">Contact: {lawyer.phoneNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
