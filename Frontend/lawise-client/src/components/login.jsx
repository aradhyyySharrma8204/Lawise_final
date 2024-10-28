import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import AuthContext from '../context/authcontext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        
        const success = await login(email, password);
        if (success) {
            const userData = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
            const role = userData.role; // Get role from user data
            
            setSuccessMessage('🎉 Congratulations! You have successfully logged in. 🎉');

            // Redirect based on user role
            if (role === 'admin') {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else if (role === 'lawyer') {
                navigate('/lawyer-dashboard'); // Redirect to lawyer dashboard
            } else if (role === 'client') {
                navigate('/client-dashboard'); // Redirect to client dashboard
            }
        } else {
            setErrorMessage('❌ Login failed! Please check your email and password. ❌');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-12 rounded-lg shadow-lg max-w-md w-full space-y-8 border border-gray-300"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">Login to Lawise</h2>
                <p className="text-center text-gray-600 text-sm">Enter your credentials to access your account.</p>

                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md shadow-md">
                        <p className="font-semibold">{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md shadow-md">
                        <p className="font-semibold">{errorMessage}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="w-4 h-4 border-gray-300 rounded" />
                        <label htmlFor="remember" className="ml-2 text-gray-600 text-sm">Remember Me</label>
                    </div>
                    <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">Forgot Password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Log In
                </button>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account? 
                    <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"> Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
