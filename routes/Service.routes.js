import express from "express"
import Service from "../models/Service.model.js"

const router = express.Router()

// ── GET all services ──────────────────────────────────────
// GET /services
router.get("/", async (req, res) => {
    try {
        const { search, category, minCost, maxCost } = req.query

        // Build filter object dynamically
        let filter = { isActive: true }

        // Search by name
        if (search) {
            filter.service_name = { $regex: search, $options: "i" }
            // $regex = search pattern, $options: "i" = case insensitive
        }

        // Filter by category
        if (category) {
            filter.service_category = category
        }

        // Filter by budget range
        if (minCost || maxCost) {
            filter.cost = {}
            if (minCost) filter.cost.$gte = Number(minCost) // greater than or equal
            if (maxCost) filter.cost.$lte = Number(maxCost) // less than or equal
        }

        const services = await Service.find(filter).sort({ createdAt: -1 })
        res.json(services)

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── GET single service by ID ──────────────────────────────
// GET /services/:id
router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)

        if (!service) {
            return res.status(404).json({ message: "Service not found" })
        }

        res.json(service)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── POST create new service (admin only — will add auth later) ──
// POST /services
router.post("/", async (req, res) => {
    try {
        const newService = new Service(req.body)
        const saved = await newService.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ message: "Error creating service", error: error.message })
    }
})

// ── PUT update service ────────────────────────────────────
// PUT /services/:id
router.put("/:id", async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return updated document
        )
        res.json(updated)
    } catch (error) {
        res.status(400).json({ message: "Error updating service", error: error.message })
    }
})

// ── DELETE service ────────────────────────────────────────
// DELETE /services/:id
router.delete("/:id", async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id)
        res.json({ message: "Service deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", error: error.message })
    }
})

export default router