const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const config = require('../config/config')

/**
 * - register controller
 * - POST /api/auth/register
 */

async function register(req, res) {
    try {
        const { email, password, name } = req.body

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(422).json({
                message: "User already exists with email",
                status: "failed"
            })
        }

        const user = await userModel.create({
            email,
            password,
            name
        })

        const token = jwt.sign({
            userId: user._id
        }, config.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.cookie("token", token)

        return res.status(201).json({
            message: "User created successfully!",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        })
    } catch (error) {
        console.error("Register error:", error)
        return res.status(500).json({
            message: "Something went wrong while registering user.",
            status: "failed"
        })
    }
}

/**
 * - Login controller
 * - POST /api/auth/login
 */

async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password!"
            })
        }

        const isValidPassword = await user.comparePassword(password)

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Wrong Password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, config.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.cookie("token", token)

        return res.status(200).json({
            message: "Login successful!",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({
            message: "Something went wrong while logging in."
        })
    }
}

module.exports = { register, login }