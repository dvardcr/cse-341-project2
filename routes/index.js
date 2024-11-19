const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Project 2']
    res.send('Project 2')});

router.use('/users', require('./users'));

router.use('/pets', require('./pets'));

module.exports = router;