import express from "express"
import User from "../models/User.model.js"
import Booking from "../models/Booking.model.js"
import Service from "../models/Service.model.js"

const router = express.Router()

// GET /stats  — public, no auth required
router.get("/", async (req, res) => {
  try {
    const [clients, projects, decorators] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Booking.countDocuments({ status: "completed" }),
      User.countDocuments({ role: "decorator" }),
    ])

    res.status(200).json({
      clients,
      projects,
      decorators,
      rating: "4.9",   // static for now — update when you add a reviews collection
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message })
  }
})

export default router