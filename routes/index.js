const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Home']
    res.send('Welcome to Library');
    console.log(req.session.user)
});