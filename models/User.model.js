import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // FIX: was required:true — Firebase email/password users have no
            // displayName by default, causing validation failure and the user
            // doc never being saved, which broke role lookups.
            required: false,
            trim: true,
            default: "",
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