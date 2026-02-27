import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import serviceRoutes from "./routes/Service.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}))
app.use(express.json())

// ── MongoDB Connection ────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err))

// ── Routes ────────────────────────────────────────────────
app.use("/services", serviceRoutes)

// ── Test Route ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("StyleDecor Server is running!")
})

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})