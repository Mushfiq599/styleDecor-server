import express from "express"
import Booking from "../models/Booking.model.js"

const router = express.Router()

// ── GET all bookings (admin) ──────────────────────────────
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── GET bookings by user email ────────────────────────────
router.get("/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── GET single booking by ID ──────────────────────────────
router.get("/:id", async (req, res) => {
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

// ── POST create booking ───────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body)
    const saved = await newBooking.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── PATCH cancel booking ──────────────────────────────────
router.patch("/cancel/:id", async (req, res) => {
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

// ── PATCH update booking status (decorator) ───────────────
router.patch("/status/:id", async (req, res) => {
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

// ── PATCH assign decorator (admin) ───────────────────────
router.patch("/assign/:id", async (req, res) => {
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

// ── PATCH update payment status ───────────────────────────
router.patch("/payment/:id", async (req, res) => {
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

// ── DELETE booking ────────────────────────────────────────
router.delete("/:id", async (req, res) => {
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