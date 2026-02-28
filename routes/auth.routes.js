import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

// ── Issue JWT Token ───────────────────────────────────────
// POST /auth/jwt
// Called right after user logs in via Firebase
router.post("/jwt", (req, res) => {
    try {
        const { email } = req.body

        // Check email exists in request
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        // Create token with email as payload
        // Token expires in 7 days
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: "Error generating token", error: error.message })
    }
})

export default router