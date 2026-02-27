import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
    {
        service_name: {
            type: String,
            required: true,
            trim: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            // per sqft, per floor, per meter, per event etc
        },
        service_category: {
            type: String,
            required: true,
            enum: ["home", "wedding", "office", "seminar", "meeting", "birthday"],
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        createdByEmail: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
)

const Service = mongoose.model("Service", serviceSchema)
export default Service