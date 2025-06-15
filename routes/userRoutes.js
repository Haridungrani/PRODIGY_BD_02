const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    getUserByEmail,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/email/:email', getUserByEmail); 
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
// This file defines the routes for user-related operations.
// It uses Express Router to handle requests for creating, retrieving, updating, and deleting users.