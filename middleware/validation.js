const { body } = require('express-validator');

const validateUserCreation = [
    body('firstname').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastname').trim().escape().notEmpty().withMessage('Last name is required'),
    body('email')
    .trim()
    .escape()
    .isEmail().withMessage('A valid email is required')
    .notEmpty().withMessage('Email is required'),
    body('address').trim().escape().notEmpty().withMessage('Address is required'),
    body('phone')
    .trim()
    .escape()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format 555-555-5555'),
    body('pet_preference').trim().escape().notEmpty().withMessage('Pet preference is required')
];

const validateUserUpdate = [
    body('firstname').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastname').trim().escape().notEmpty().withMessage('Last name is required'),
    body('email')
    .trim()
    .escape()
    .isEmail().withMessage('A valid email is required')
    .notEmpty().withMessage('Email is required'),
    body('address').trim().escape().notEmpty().withMessage('Address is required'),
    body('phone')
    .trim()
    .escape()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format 555-555-5555'),
    body('pet_preference').trim().escape().notEmpty().withMessage('Pet preference is required')
];

module.exports = { validateUserCreation, validateUserUpdate };