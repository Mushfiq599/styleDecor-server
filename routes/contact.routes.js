const express = require("express")
const router  = express.Router()
const Contact = require("../models/Contact.model")

// POST /contact  — public, saves message to DB
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body

  // Server-side validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" })
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ message: "Message must be at least 10 characters" })
  }

  try {
    const contact = new Contact({ name, email, subject, message })
    await contact.save()
    res.status(201).json({ message: "Message received! We'll get back to you soon." })
  } catch (error) {
    res.status(500).json({ message: "Failed to save message", error: error.message })
  }
})

// GET /contact  — admin only (protect with verifyToken + isAdmin in index.js if needed)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message })
  }
})

module.exports = router