const express    = require("express")
const router     = express.Router()
const User       = require("../models/User.model")
const verifyToken = require("../middleware/verifyToken")
const isAdmin    = require("../middleware/isAdmin")

// POST /users — create or update user (called on login/register)
router.post("/", async (req, res) => {
  const { email, name, photo } = req.body
  if (!email) return res.status(400).json({ message: "Email is required" })
  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(200).json({ message: "User already exists", user: existing })
    }
    const user = new User({ email, name, photo, role: "user" })
    await user.save()
    res.status(201).json({ message: "User created", user })
  } catch (error) {
    res.status(500).json({ message: "Failed to save user", error: error.message })
  }
})

// GET /users — admin: get all users
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message })
  }
})

// GET /users/role/:email — get a single user's role (used by useRole hook)
router.get("/role/:email", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json({ role: user.role })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch role", error: error.message })
  }
})

// PATCH /users/role/:email — admin: update a user's role
router.patch("/role/:email", verifyToken, isAdmin, async (req, res) => {
  const { role } = req.body
  const allowedRoles = ["user", "admin", "decorator"]
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be user, admin, or decorator." })
  }
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { role },
      { new: true }
    )
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json({ message: "Role updated", user })
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error: error.message })
  }
})

module.exports = router