const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Home']
//     res.send('Welcome to Library');
//     //console.log(req.session.user)
// });

router.use('/book', require('./book'));
router.use('/author', require('./author'));
router.use('/user', require('./user'));
router.use('/review', require('./review'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});

module.exports = router;