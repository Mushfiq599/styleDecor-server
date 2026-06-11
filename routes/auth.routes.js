import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.model.js"

const router = express.Router()
router.post("/jwt", async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        // Look up the user's role so we can embed it in the token.
        // The isAdmin middleware (and any future role checks) read req.user.role,
        // which comes from the decoded token — so the token must carry the role.
        let role = "user"
        try {
            const user = await User.findOne({ email })
            if (user?.role) role = user.role
        } catch {
            // If the DB lookup fails, fall back to "user" — the token is still issued
            // and route-level guards will deny access to admin-only endpoints.
        }

        const token = jwt.sign(
            { email, role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: "Error generating token", error: error.message })
    }
})

export default router