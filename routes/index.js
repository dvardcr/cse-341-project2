const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

/* router.get('/', (req, res) => {
    //#swagger.tags=['Project 2']
    res.send('Project 2')}); */

router.use('/users', require('./users'));

router.use('/pets', require('./pets'));

// Week 4 Login and Logout route

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;