import express from "express"
import Service from "../models/Service.model.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// ── PUBLIC: GET all services ──────────────────────────────
// GET /services
router.get("/", async (req, res) => {
    try {
        const { search, category, minCost, maxCost } = req.query
        let filter = { isActive: true }

        if (search) {
            filter.service_name = { $regex: search, $options: "i" }
        }
        if (category) {
            filter.service_category = category
        }
        if (minCost || maxCost) {
            filter.cost = {}
            if (minCost) filter.cost.$gte = Number(minCost)
            if (maxCost) filter.cost.$lte = Number(maxCost)
        }

        const services = await Service.find(filter).sort({ createdAt: -1 })
        res.json(services)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

// ── PUBLIC: GET single service by ID ─────────────────────
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

// ── PRIVATE: POST create new service (admin only) ────────
// POST /services
router.post("/", verifyToken, async (req, res) => {
    try {
        const newService = new Service(req.body)
        const saved = await newService.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ message: "Error creating service", error: error.message })
    }
})

// ── PRIVATE: PUT update service (admin only) ─────────────
// PUT /services/:id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updated) {
            return res.status(404).json({ message: "Service not found" })
        }
        res.json(updated)
    } catch (error) {
        res.status(400).json({ message: "Error updating service", error: error.message })
    }
})

// ── PRIVATE: DELETE service (admin only) ─────────────────
// DELETE /services/:id
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).json({ message: "Service not found" })
        }
        res.json({ message: "Service deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", error: error.message })
    }
})

export default router