import express from 'express';
import { register, login } from '../controllers/auth';
import { signIn } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', signIn, login);

module.exports = router;