import express from 'express';
import { loginSchema, registerSchema } from '../validators/authSchema';
import { register, login } from '../controllers/auth';
import validate from '../middlewares/validateJoi';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
