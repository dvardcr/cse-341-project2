const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const { validatePetCreation, validatePetUpdate } = require('../middleware/petsValidation');
const errorHandling = require('../middleware/errorHandling');
const { validationResult } = require('express-validator');

// Get all pets
router.get('/', errorHandling(petsController.getAll));

// Get one pet by ID
router.get('/:id', errorHandling(petsController.getSingle));

// Add new pet (with validation and error handling)
router.post(
    '/',
    validatePetCreation,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Respond with validation errors if any
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed to the controller if validation passes
    },
    errorHandling(petsController.createPet)
);

// Update pet (with validation and error handling)
router.put(
    '/:id',
    validatePetUpdate,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Respond with validation errors if any
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed to the controller if validation passes
    },
    errorHandling(petsController.updatePet)
);

// Remove pet
router.delete('/:id', errorHandling(petsController.deletePet));

module.exports = router;