const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateUserCreation, validateUserUpdate } = require('../middleware/usersValidation');
const errorHandling = require('../middleware/errorHandling');
const { validationResult } = require('express-validator');

const { isAuthenticated } = require('../middleware/authenticate');

// Get All Users
router.get('/', errorHandling(usersController.getAll));

// Get One User by ID
router.get('/:id', errorHandling(usersController.getSingle));

router.post('/login', (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, errorHandling(usersController.loginUser));

// Add new user
router.post(
    '/',
    isAuthenticated,
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
    isAuthenticated,
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
router.delete('/:id', isAuthenticated, errorHandling(usersController.deleteUser));

module.exports = router;