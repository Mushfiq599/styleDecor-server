import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───────────────────────────────────────────
// Allows your React client to talk to this server
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

// Allows server to read JSON data from requests
app.use(express.json())

// ─── MongoDB Connection ───────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log('❌ MongoDB Error:', err))

// ─── Test Route ───────────────────────────────────────────
// Just to check if server is running
app.get('/', (req, res) => {
    res.send('StyleDecor Server is running!')
})

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})