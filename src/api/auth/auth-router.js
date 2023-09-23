const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login } = require('./auth-controller');

router.post('/register', register);
router.post('/login', login);

router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        return res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        });
    }
);

module.exports = router;
