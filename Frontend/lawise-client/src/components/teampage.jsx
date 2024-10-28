import React from 'react';

// Sample data for lawyers
const lawyers = [
  {
    name: 'John Doe',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Corporate Law',
  },
  {
    name: 'Jane Smith',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Family Law',
  },
  {
    name: 'Mike Johnson',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Criminal Defense',
  },
  {
    name: 'John Doe',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Corporate Law',
  },
  {
    name: 'Jane Smith',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Family Law',
  },
  {
    name: 'Mike Johnson',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Criminal Defense',
  },
  {
    name: 'John Doe',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Corporate Law',
  },
  {
    name: 'Jane Smith',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Family Law',
  },
  {
    name: 'Mike Johnson',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Criminal Defense',
  },
  {
    name: 'John Doe',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Corporate Law',
  },
  {
    name: 'Jane Smith',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Family Law',
  },
  {
    name: 'Mike Johnson',
    image: '/me2_ufff.jpeg', // Replace with actual image path
    specialization: 'Criminal Defense',
  },
  // Add more lawyers as needed
];

const TeamPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Meet Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lawyers.map((lawyer, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 text-center">
            <img
              src={lawyer.image}
              alt={lawyer.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">{lawyer.name}</h3>
            <p className="text-gray-600">{lawyer.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
