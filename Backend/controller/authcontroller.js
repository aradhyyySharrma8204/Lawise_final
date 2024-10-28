// controller/authcontroller.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//signup function================================================
const signup = async (req, res) => {
    console.log("control signup function in controller tak pahuch gya")
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        console.log("user created succesfully");
        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Signup error:", error); // Log the error
        res.status(500).json({ message: "Server error." });
    }
};

// Login function=====================================================================
/*const login = async (req, res) => {
    console.log("control login function tak pahuch gya");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found." });

        // Uncomment if passwords are hashed
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        // If not using bcrypt, directly check the password
        if (user.password !== password) return res.status(400).json({ message: "Invalid credentials." });

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error." });
    }
*/

const login = async (req, res) => {
    console.log("control login function tak pahuch gya");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found." });

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token along with the user info
        res.status(200).json({ token, message: "Login successful.",  role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error." });
    }

};


module.exports = { signup ,login};
