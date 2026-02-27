import mongoose from "mongoose"
import dotenv from "dotenv"
import Service from "./models/Service.model.js"

dotenv.config()

const seedServices = [
    {
        service_name: "Home Interior Decoration",
        cost: 5000,
        unit: "per room",
        service_category: "home",
        description: "Transform your living spaces with our expert interior decoration services tailored to your personal style and budget.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Wedding Ceremony Setup",
        cost: 25000,
        unit: "per event",
        service_category: "wedding",
        description: "Make your special day unforgettable with breathtaking floral arrangements and full venue decoration.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Office Space Decoration",
        cost: 8000,
        unit: "per floor",
        service_category: "office",
        description: "Create an inspiring and productive work environment with our professional office decoration packages.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Seminar Hall Decoration",
        cost: 12000,
        unit: "per event",
        service_category: "seminar",
        description: "Impress your guests with stunning stage setups and hall decorations for any corporate seminar or event.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Birthday Party Setup",
        cost: 3500,
        unit: "per event",
        service_category: "birthday",
        description: "Celebrate in style with vibrant themed birthday decorations that bring joy and energy to every moment.",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Meeting Room Setup",
        cost: 4000,
        unit: "per room",
        service_category: "meeting",
        description: "Professional and elegant meeting room setups that leave a lasting impression on your clients and partners.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Full Home Makeover",
        cost: 35000,
        unit: "per home",
        service_category: "home",
        description: "Complete home transformation from living room to bedroom with premium furniture arrangement and decor.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Reception Decoration",
        cost: 18000,
        unit: "per event",
        service_category: "wedding",
        description: "Elegant reception setups with custom lighting, floral backdrops and table arrangements for your big night.",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80",
        createdByEmail: "admin@styledecor.com",
    },
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connected to MongoDB")

        // Clear existing services
        await Service.deleteMany({})
        console.log("🗑️  Cleared existing services")

        // Insert new services
        await Service.insertMany(seedServices)
        console.log("🌱 Seeded 8 services successfully!")

        process.exit(0)
    } catch (error) {
        console.error("❌ Seeding failed:", error)
        process.exit(1)
    }
}

seedDB()