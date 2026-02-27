import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceImage: {
      type: String,
      default: "",
    },
    serviceCost: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "planning",
        "materials_prepared",
        "on_the_way",
        "setup_in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    assignedDecorator: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Booking", bookingSchema)