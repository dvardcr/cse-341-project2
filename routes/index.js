const router = require('express').Router();

router.get('/', (req, res) => {res.send('Project 2')});

router.use('/users', require('./users'));

module.exports = router;