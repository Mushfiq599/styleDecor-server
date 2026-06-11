import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import statsRoutes from "./routes/stats.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import authRoutes from "./routes/auth.routes.js"
import paymentRoutes from "./routes/payment.routes.js"   // ← was missing
import Service from "./models/Service.model.js"

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
app.use("/auth",     authRoutes)
app.use("/payments", paymentRoutes)   // ← was missing
app.use("/users",    userRoutes)
app.use("/services", serviceRoutes)
app.use("/bookings", bookingRoutes)
app.use("/stats",    statsRoutes)
app.use("/contact",  contactRoutes)

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "StyleDecor API is running 🎨" })
})

// ── One-time seed endpoint ────────────────────────────────────
// Protected by a secret key — set SEED_SECRET in your env vars
// Call: GET /seed?secret=YOUR_SEED_SECRET
app.get("/seed", async (req, res) => {
  const { secret } = req.query

  if (!secret || secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ message: "Unauthorized. Provide correct ?secret= key." })
  }

  const seedServices = [
    { service_name: "Living Room Styling", cost: 4500, unit: "per room", service_category: "home", description: "Modern living room styling with curated furniture, lighting, and wall décor.", image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Bedroom Theme Makeover", cost: 6000, unit: "per room", service_category: "home", description: "Cozy bedroom redesign with theme-based colors, fabrics and lighting.", image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Kids Room Decoration", cost: 5500, unit: "per room", service_category: "home", description: "Fun and safe kids room décor with custom themes and wall art.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Kitchen & Dining Styling", cost: 7000, unit: "per area", service_category: "home", description: "Functional and stylish kitchen-dining décor with storage and lighting upgrades.", image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Balcony & Terrace Décor", cost: 3800, unit: "per area", service_category: "home", description: "Convert your balcony or terrace into a cozy outdoor retreat.", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Home Festive Decoration", cost: 9000, unit: "per home", service_category: "home", description: "Complete festive home décor with lights, florals and thematic props.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Home Interior Decoration", cost: 5000, unit: "per room", service_category: "home", description: "Transform your living spaces with our expert interior decoration services tailored to your personal style and budget.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Full Home Makeover", cost: 35000, unit: "per home", service_category: "home", description: "Complete home transformation from living room to bedroom with premium furniture arrangement and decor.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Engagement Ceremony Setup", cost: 20000, unit: "per event", service_category: "wedding", description: "Romantic engagement stage, entry gate and seating décor.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Mehndi & Haldi Décor", cost: 16000, unit: "per event", service_category: "wedding", description: "Colorful mehndi/haldi setups with traditional backdrops and seating.", image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Sangeet Night Decoration", cost: 22000, unit: "per event", service_category: "wedding", description: "Vibrant stage, dance floor and lighting décor for sangeet nights.", image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Destination Wedding Décor", cost: 75000, unit: "per event", service_category: "wedding", description: "End-to-end destination wedding decoration with custom themes.", image: "https://images.unsplash.com/photo-1529636443402-49f09c77c468?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Wedding Photo Booth Setup", cost: 8000, unit: "per event", service_category: "wedding", description: "Creative wedding photo booth with props and designer backdrops.", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Mandap & Stage Floral Décor", cost: 30000, unit: "per event", service_category: "wedding", description: "Premium floral mandap and stage decoration for traditional ceremonies.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Wedding Ceremony Setup", cost: 25000, unit: "per event", service_category: "wedding", description: "Make your special day unforgettable with breathtaking floral arrangements and full venue decoration.", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Reception Decoration", cost: 18000, unit: "per event", service_category: "wedding", description: "Elegant reception setups with custom lighting, floral backdrops and table arrangements for your big night.", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Corporate Event Backdrop Design", cost: 10000, unit: "per event", service_category: "seminar", description: "Custom printed and floral backdrops for seminars and launches.", image: "https://images.unsplash.com/photo-1549921296-3c710f6a3c31?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Conference Stage & Podium Setup", cost: 14000, unit: "per event", service_category: "seminar", description: "Professional conference stage, podium, and banner decoration.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Product Launch Event Décor", cost: 18000, unit: "per event", service_category: "seminar", description: "Brand-focused decoration for product launches and press meets.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Seminar Hall Decoration", cost: 12000, unit: "per event", service_category: "seminar", description: "Impress your guests with stunning stage setups and hall decorations for any corporate seminar or event.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Corporate Office Entrance Styling", cost: 5000, unit: "per area", service_category: "office", description: "Elegant office reception and entrance decoration for strong first impressions.", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Coworking Space Decoration", cost: 9000, unit: "per floor", service_category: "office", description: "Modern coworking décor with zones for focus, collaboration and relaxation.", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Office Festive & Event Décor", cost: 11000, unit: "per event", service_category: "office", description: "Themed office decorations for festivals, annual days and celebrations.", image: "https://images.unsplash.com/photo-1515165562835-c4c9e0737eaa?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Office Space Decoration", cost: 8000, unit: "per floor", service_category: "office", description: "Create an inspiring and productive work environment with our professional office decoration packages.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Kids Birthday Theme Party", cost: 5000, unit: "per event", service_category: "birthday", description: "Cartoon and superhero themed décor for kids birthday parties.", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Milestone Birthday Celebration Décor", cost: 7000, unit: "per event", service_category: "birthday", description: "Elegant décor for 18th, 25th, 40th and 50th birthday events.", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Surprise Room Decoration", cost: 3000, unit: "per room", service_category: "birthday", description: "Balloon and flower based surprise room setup for special occasions.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Birthday Party Setup", cost: 3500, unit: "per event", service_category: "birthday", description: "Celebrate in style with vibrant themed birthday decorations that bring joy and energy to every moment.", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Meeting Room Setup", cost: 4000, unit: "per room", service_category: "meeting", description: "Professional and elegant meeting room setups that leave a lasting impression on your clients and partners.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Festival Home Lighting Setup", cost: 6000, unit: "per home", service_category: "festival", description: "Outdoor and indoor decorative lighting for Diwali, Christmas and Eid.", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Religious Function Stage Décor", cost: 15000, unit: "per event", service_category: "festival", description: "Stage decoration for puja, kirtan, and other religious gatherings.", image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Exhibition Stall Design & Décor", cost: 20000, unit: "per stall", service_category: "exhibition", description: "Customized exhibition stall layout, branding and decoration.", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&q=80", createdByEmail: "admin@styledecor.com" },
    { service_name: "Trade Fair Booth Styling", cost: 24000, unit: "per event", service_category: "exhibition", description: "Attractive trade fair booth décor to maximize visitor engagement.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80", createdByEmail: "admin@styledecor.com" },
  ]

  try {
    await Service.deleteMany({})
    await Service.insertMany(seedServices)
    res.status(200).json({
      message: `✅ Successfully seeded ${seedServices.length} services into the database.`,
      count: seedServices.length,
    })
  } catch (error) {
    res.status(500).json({ message: "❌ Seeding failed", error: error.message })
  }
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