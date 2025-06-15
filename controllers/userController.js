// Updated userController.js using MongoDB (Task 2)
const User = require('../models/User');
const { isValidUser, isValidEmail } = require('../utils/validate');

// CREATE
const createUser = async (req, res) => {
    const { name, email, age } = req.body;

    if (!isValidUser(name, email, age)) {
        return res.status(400).json({ error: 'Invalid input fields.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// READ ALL
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// READ ONE
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// SEARCH BY EMAIL
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ error: 'User with this email not found.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// UPDATE
const updateUser = async (req, res) => {
    const { name, email, age } = req.body;

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// DELETE
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
