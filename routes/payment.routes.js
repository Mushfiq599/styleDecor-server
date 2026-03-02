import express from "express"
import Stripe from "stripe"
import dotenv from "dotenv"
import Booking from "../models/Booking.model.js"
import verifyToken from "../middleware/verifyToken.js"

dotenv.config()
const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

router.post("/create-payment-intent", verifyToken, async (req, res) => {
    try {
        const { bookingId } = req.body
        const booking = await Booking.findById(bookingId)
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }

        if (booking.userEmail !== req.user.email) {
            return res.status(403).json({ message: "Forbidden! Not your booking." })
        }
        if (booking.paymentStatus === "paid") {
            return res.status(400).json({ message: "Booking already paid!" })
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.serviceCost * 100,
            currency: "usd",
            metadata: {
                bookingId: booking._id.toString(),
                userEmail: booking.userEmail,
                serviceName: booking.serviceName,
            },
        })

        res.json({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        res.status(500).json({ message: "Payment error", error: error.message })
    }
})

router.post("/confirm", verifyToken, async (req, res) => {
    try {
        const { bookingId, transactionId } = req.body
        const updated = await Booking.findByIdAndUpdate(
            bookingId,
            {
                paymentStatus: "paid",
                transactionId: transactionId,
            },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ message: "Booking not found" })
        }

        res.json({
            message: "Payment confirmed successfully!",
            booking: updated,
        })
    } catch (error) {
        res.status(500).json({ message: "Error confirming payment", error: error.message })
    }
})
router.get("/history/:email", verifyToken, async (req, res) => {
    try {
        if (req.user.email !== req.params.email) {
            return res.status(403).json({ message: "Forbidden! Access denied." })
        }
        const payments = await Booking.find({
            userEmail: req.params.email,
            paymentStatus: "paid",
        }).sort({ createdAt: -1 })

        res.json(payments)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

export default router