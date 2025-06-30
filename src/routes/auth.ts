import express from 'express'
import { registerSchema } from '../validators/authSchema'
import { register } from '../controllers/auth'
import validate from '../middlewares/validateJoi'

const router = express.Router()

router.post('/register', validate(registerSchema), register)


export default router