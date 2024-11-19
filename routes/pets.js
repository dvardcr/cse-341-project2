const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

//Get All Pets
router.get('/', petsController.getAll);

//Get One Pet by id
router.get('/:id', petsController.getSingle);

// Add new pet
router.post('/', petsController.createPet);

// Modify pet
router.put('/:id', petsController.updatePet);

// Remove pet
router.delete('/:id', petsController.deletePet);

module.exports = router;