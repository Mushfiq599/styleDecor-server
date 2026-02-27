import express from "express"
import Booking from "../models/Booking.model.js"

const router = express.Router()

// ── Create a booking ──────────────────────────────────────
// POST /bookings
router.post("/", async (req, res) => {
    try {
        const newBooking = new Booking(req.body)
        const saved = await newBooking.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ message: "Error creating booking", error: error.message })
    }
})

// ── Get bookings by user email ────────────────────────────
// GET /bookings/user/:email
router.get("/user/:email", async (req, res) => {
    try {
        const bookings = await Booking.find({
            userEmail: req.params.email
        }).sort({ createdAt: -1 })
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Get all bookings (admin) ──────────────────────────────
// GET /bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 })
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Cancel a booking ──────────────────────────────────────
// PATCH /bookings/cancel/:id
router.patch("/cancel/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }
        // Only pending bookings can be cancelled
        if (booking.status !== "pending") {
            return res.status(400).json({
                message: "Only pending bookings can be cancelled"
            })
        }
        booking.status = "cancelled"
        await booking.save()
        res.json(booking)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Update booking status (decorator) ────────────────────
// PATCH /bookings/status/:id
router.patch("/status/:id", async (req, res) => {
    try {
        const { status } = req.body
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Assign decorator (admin) ──────────────────────────────
// PATCH /bookings/assign/:id
router.patch("/assign/:id", async (req, res) => {
    try {
        const { assignedDecorator } = req.body
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { assignedDecorator, status: "assigned" },
            { new: true }
        )
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── Delete booking ────────────────────────────────────────
// DELETE /bookings/:id
router.delete("/:id", async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id)
        res.json({ message: "Booking deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

export default router