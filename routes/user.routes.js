import express from "express"
import User from "../models/User.model.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: admin only" })
  }
  next()
}

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

// GET /users/set-roles?secret=YOUR_SEED_SECRET
// One-time endpoint — upserts vtimely46@gmail.com as admin
// and mellowm678@gmail.com as decorator
router.get("/set-roles", async (req, res) => {
  if (req.query.secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const targets = [
    { email: "vtimely46@gmail.com",  role: "admin",     name: "Admin" },
    { email: "mellowm678@gmail.com", role: "decorator", name: "Decorator" },
  ]

  try {
    const results = []

    for (const target of targets) {
      const user = await User.findOneAndUpdate(
        { email: target.email },
        { role: target.role, name: target.name },
        {
          new: true,
          upsert: true,   // create the doc if it doesn't exist yet
          setDefaultsOnInsert: true,
        }
      )
      results.push({ email: user.email, role: user.role, action: user.createdAt === user.updatedAt ? "created" : "updated" })
    }

    res.status(200).json({
      message: "✅ Roles set successfully!",
      results,
    })
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to set roles", error: error.message })
  }
})

export default router