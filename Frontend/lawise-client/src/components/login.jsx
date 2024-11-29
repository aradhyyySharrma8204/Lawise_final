import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authcontext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const success = await login(email, password);
        if (success) {
            const userData = JSON.parse(localStorage.getItem('user'));
            const role = userData.role;

            setSuccessMessage('🎉 Successfully logged in! 🎉');

            if (role === 'admin') navigate('/admin-dashboard');
            else if (role === 'lawyer') navigate('/lawyer-dashboard');
            else if (role === 'client') navigate('/client-dashboard');
        } else {
            setErrorMessage('❌ Login failed! Please check your email and password. ❌');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}></div>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full space-y-6 relative border border-white/20"
            >
                <h2 className="text-4xl font-extrabold text-white text-center">Welcome Back</h2>
                <p className="text-center text-white/70 text-md mb-6">Sign in to continue</p>

                {successMessage && (
                    <div className="bg-green-50/90 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm transition duration-300">
                        <p>{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50/90 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm transition duration-300">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-white/80 font-semibold mb-2">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        required
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out text-gray-900 placeholder-gray-400 bg-white/80"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-white/80 font-semibold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out text-gray-900 placeholder-gray-400 bg-white/80"
                    />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center text-white/70">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded" />
                        Remember Me
                    </label>
                    <a href="/forgot-password" className="text-purple-300 hover:underline text-sm">Forgot Password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-6 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-md"
                >
                    Log In
                </button>

                <p className="text-center text-white/70 text-sm mt-6">
                    Don’t have an account? 
                    <a href="/signup" className="text-purple-300 hover:text-purple-400 font-medium transition-colors duration-200"> Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
