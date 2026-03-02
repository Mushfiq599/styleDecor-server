import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()
router.post("/jwt", (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
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