import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        photo: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["user", "admin", "decorator"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema)
export default User