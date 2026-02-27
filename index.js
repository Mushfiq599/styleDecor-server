import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import serviceRoutes from "./routes/service.routes.js"
import userRoutes from "./routes/User.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err))

// ── Routes ────────────────────────────────────────────────
app.use("/services", serviceRoutes)
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.send("StyleDecor Server is running!")
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
