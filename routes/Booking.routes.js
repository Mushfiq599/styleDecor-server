import express from "express"
import Booking from "../models/Booking.model.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// ── PRIVATE: Get all bookings (admin) ─────────────────────
// GET /bookings
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Get bookings by user email ───────────────────
// GET /bookings/user/:email
router.get("/user/:email", verifyToken, async (req, res) => {
  try {
    // Make sure logged in user can only see their own bookings
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: "Forbidden! Access denied." })
    }
    const bookings = await Booking.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Get single booking by ID ────────────────────
// GET /bookings/:id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Create booking ───────────────────────────────
// POST /bookings
router.post("/", verifyToken, async (req, res) => {
  try {
    const newBooking = new Booking(req.body)
    const saved = await newBooking.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── PRIVATE: Cancel booking ───────────────────────────────
// PATCH /bookings/cancel/:id
router.patch("/cancel/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    if (booking.status !== "pending") {
      return res.status(400).json({
        message: "Only pending bookings can be cancelled",
      })
    }
    booking.status = "cancelled"
    await booking.save()
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Update booking status (decorator) ───────────
// PATCH /bookings/status/:id
router.patch("/status/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!updated) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Assign decorator (admin) ────────────────────
// PATCH /bookings/assign/:id
router.patch("/assign/:id", verifyToken, async (req, res) => {
  try {
    const { assignedDecorator } = req.body
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { assignedDecorator, status: "assigned" },
      { new: true }
    )
    if (!updated) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Update payment status ───────────────────────
// PATCH /bookings/payment/:id
router.patch("/payment/:id", verifyToken, async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, transactionId },
      { new: true }
    )
    if (!updated) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── PRIVATE: Delete booking ───────────────────────────────
// DELETE /bookings/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json({ message: "Booking deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router