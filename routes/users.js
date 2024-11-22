const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateUserCreation, validateUserUpdate } = require('../middleware/validation');
const errorHandling = require('../middleware/errorHandling');
const { validationResult } = require('express-validator');

// Get All Users
router.get('/', errorHandling(usersController.getAll));

// Get One User by ID
router.get('/:id', errorHandling(usersController.getSingle));

// Add new user
router.post(
    '/',
    validateUserCreation,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    errorHandling(usersController.createUser)
);

// Modify user
router.put(
    '/:id',
    validateUserUpdate,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    errorHandling(usersController.updateUser)
);

// Remove user
router.delete('/:id', errorHandling(usersController.deleteUser));

module.exports = router;