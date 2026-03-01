import express from "express"
import User from "../models/User.model.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// ── PUBLIC: Save user to DB after Firebase register/login ─
// POST /users
router.post("/", async (req, res) => {
    try {
        const { email, name, photo } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json(existingUser)
        }
        const newUser = new User({ email, name, photo })
        const saved = await newUser.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message })
    }
})

// GET all decorators
router.get("/decorators", async (req, res) => {
    try {
        const decorators = await User.find({ role: "decorator" })
        res.json(decorators)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── PUBLIC: Get user role by email ────────────────────────
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

// ── PRIVATE: Get all users (admin only) ───────────────────
// GET /users
router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── PRIVATE: Update user role ─────────────────────────────
// PATCH /users/role/:email
router.patch("/role/:email", verifyToken, async (req, res) => {
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