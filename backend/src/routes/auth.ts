import express from 'express';

const router = express.Router();
const authController = require('../controllers/auth');
const signIn = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', signIn, authController.login);

module.exports = router;