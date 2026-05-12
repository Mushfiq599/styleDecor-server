import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import serviceRoutes from "./routes/service.routes.js"
import userRoutes from "./routes/user.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import authRoutes from "./routes/auth.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:5173", "https://style-decor-client-five.vercel.app"],
  credentials: true,
}))
app.use(express.json())

app.use("/services", serviceRoutes)
app.use("/users", userRoutes)
app.use("/bookings", bookingRoutes)
app.use("/auth", authRoutes)
app.use("/payments", paymentRoutes)

app.get("/", (req, res) => {
  res.send("StyleDecor Server is running!")
})

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(" MongoDB Connected")
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message)
    process.exit(1)
  }
}

startServer()