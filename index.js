const express       = require("express")
const mongoose      = require("mongoose")
const cors          = require("cors")
const dotenv        = require("dotenv")

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
const userRoutes       = require("./routes/user.routes")
const serviceRoutes    = require("./routes/service.routes")
const bookingRoutes    = require("./routes/booking.routes")
const statsRoutes      = require("./routes/stats.routes")
const contactRoutes    = require("./routes/contact.routes")

app.use("/users",    userRoutes)
app.use("/services", serviceRoutes)
app.use("/bookings", bookingRoutes)
app.use("/stats",    statsRoutes)
app.use("/contact",  contactRoutes)

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