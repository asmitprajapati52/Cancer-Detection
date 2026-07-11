const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const dns = require('dns'); // ✅ Add this

// ✅ Force Node to use Google DNS instead of 127.0.0.1
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🚀 Scan routes
const scanRoutes = require('./routes/scan');

const app = express();

// DB Connect
connectDB();

app.use(cors());
app.use(express.json());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/scan', scanRoutes);

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: 'User already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email,
            password: hashedPassword,
            name
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully!' });

    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({
                message: 'User not found.'
            });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({
                message: 'Incorrect password.'
            });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});