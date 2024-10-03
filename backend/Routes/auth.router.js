import express from 'express';
import { authCheck, login, logout, signUp } from '../Controllers/auth.controller.js';
import { protectRoute } from '../Middlewares/protectRoute.js'

const router = express.Router();

router.post('/signup',signUp);

router.post('/login',login);

router.post('/logout',logout);

router.get('/check',protectRoute, authCheck);

export default router;