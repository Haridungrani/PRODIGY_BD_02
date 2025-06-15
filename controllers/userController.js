const { v4: uuidv4 } = require('uuid');
const { isValidUser, isValidEmail } = require('../utils/validate');

const users = new Map();

// CREATE
const createUser = (req, res) => {
    const { name, email, age } = req.body;

    if (!isValidUser(name, email, age)) {
        return res.status(400).json({ error: 'Invalid input fields.' });
    }

    for (let user of users.values()) {
        if (user.email === email) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }
    }

    const id = uuidv4();
    const user = { id, name, email, age };
    users.set(id, user);
    res.status(201).json(user);
};

// READ ALL
const getAllUsers = (req, res) => {
    res.json([...users.values()]);
};

// READ ONE
const getUserById = (req, res) => {
    const user = users.get(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
};

// SEARCH BY EMAIL
const getUserByEmail = (req, res) => {
    const targetEmail = req.params.email.toLowerCase();

    for (let user of users.values()) {
        if (!user.deleted && user.email.toLowerCase() === targetEmail) {
            return res.json(user);
        }
    }

    res.status(404).json({ error: 'User with this email not found.' });
};


// UPDATE
const updateUser = (req, res) => {
    const user = users.get(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const { name, email, age } = req.body;

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    users.set(req.params.id, user);
    res.json(user);
};

// DELETE
const deleteUser = (req, res) => {
    const userId = req.params.id;

    if (!users.has(userId)) {
        return res.status(404).json({ error: 'Cannot delete: User does not exist.' });
    }

    users.delete(userId);
    res.status(200).json({ message: 'User deleted successfully.' });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
