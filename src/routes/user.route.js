const express = require('express')

const authController = require('../controllers/auth.controller')

const authRouter = express.Router();

/**
 * POST /api/auth/register
 */
authRouter.post('/register',authController.register)

/**
 * POST /api/auth/login
 */
authRouter.post('/login',authController.login)

module.exports = authRouter