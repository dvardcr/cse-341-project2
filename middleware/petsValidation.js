const { body } = require('express-validator');

const validatePetCreation = [
    body('name').trim().escape().notEmpty().withMessage('Pet name is required'),
    body('species').trim().escape().notEmpty().withMessage('Pet species is required'),
    body('breed').trim().escape().notEmpty().withMessage('Pet breed is required'),
    body('age').isInt({ min: 0 }).withMessage('Pet age must be a positive integer'),
    body('shelter_site').trim().escape().notEmpty().withMessage('Shelter site is required'),
    body('description').trim().escape().notEmpty().withMessage('Pet description is required')
];

const validatePetUpdate = [
    body('name').trim().escape().notEmpty().withMessage('Pet name is required'),
    body('species').trim().escape().notEmpty().withMessage('Pet species is required'),
    body('breed').trim().escape().notEmpty().withMessage('Pet breed is required'),
    body('age').isInt({ min: 0 }).withMessage('Pet age must be a positive integer'),
    body('shelter_site').trim().escape().notEmpty().withMessage('Shelter site is required'),
    body('description').trim().escape().notEmpty().withMessage('Pet description is required')
];

module.exports = { validatePetCreation, validatePetUpdate };