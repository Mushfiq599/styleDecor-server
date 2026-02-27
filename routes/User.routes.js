import express from "express"
import User from "../models/User.model.js"

const router = express.Router()

// ── Save user to DB after Firebase register/login ─────────
// POST /users
router.post("/", async (req, res) => {
    try {
        const { email, name, photo } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // User exists → just return their data (for social login)
            return res.json(existingUser)
        }

        // New user → save to database
        const newUser = new User({ email, name, photo })
        const saved = await newUser.save()
        res.status(201).json(saved)

    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message })
    }
})

// ── Get user role by email ────────────────────────────────
// GET /users/role/:email
router.get("/role/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ role: user.role })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Get all users (admin only — auth added later) ─────────
// GET /users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Update user role ──────────────────────────────────────
// PATCH /users/role/:email
router.patch("/role/:email", async (req, res) => {
    try {
        const { role } = req.body
        const updated = await User.findOneAndUpdate(
            { email: req.params.email },
            { role },
            { new: true }
        )
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error: error.message })
    }
})

export default router