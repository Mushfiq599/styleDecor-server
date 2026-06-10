import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import statsRoutes from "./routes/stats.routes.js"
import contactRoutes from "./routes/contact.routes.js"

dotenv.config()

const app = express()

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:5173",
    "https://style-decor-client-five.vercel.app",
  ],
  credentials: true,
}))
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────
app.use("/users", userRoutes)
app.use("/services", serviceRoutes)
app.use("/bookings", bookingRoutes)
app.use("/stats", statsRoutes)
app.use("/contact", contactRoutes)

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "StyleDecor API is running 🎨" })
})

// ── Centralized error handler ─────────────────────────────────
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
})

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// ── DB + Server ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message)
    process.exit(1)
  })