const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// DB Connect
connectDB();

app.use(cors());
app.use(express.json());

// 🚀 REGISTER ROUTE (Fixed path, fixed req/res order)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'user already exist hai' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword, name });
        await user.save();

        res.status(201).json({ message: 'user successful created!' });
    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
});

// 🔑 LOGIN ROUTE (Fixed JWT expiresIn time to '1d')
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User nahi mila! Pehle register karo.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Galat password hai bhai!' });

        // 'id' ki jagah '1d' (1 day) kiya taaki JWT crash na kare
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user._id, email: user.email, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));