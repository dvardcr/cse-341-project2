const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

//Get All Users
router.get('/', usersController.getAll);

//Get One User by id
router.get('/:id', usersController.getSingle);

// Add new user
router.post('/', usersController.createUser);

// Modify user
router.put('/:id', usersController.updateUser);

// Remove user
router.delete('/:id', usersController.deleteUser);

module.exports = router;