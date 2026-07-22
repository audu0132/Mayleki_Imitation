import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    rentalNumber: { type: String, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customerName: String,
    customerPhone: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productTitle: String,
    productImage: String,
    // Rental period
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true },
    // Pricing
    dailyRate: { type: Number, required: true },
    rentalAmount: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "partial", "refunded"],
      default: "pending",
    },
    depositRefunded: { type: Boolean, default: false },
    depositRefundDate: Date,
    // Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "active", "returned", "overdue", "cancelled"],
      default: "pending",
    },
    // Condition
    productCondition: {
      type: String,
      enum: ["good", "minor_damage", "major_damage"],
    },
    damageNotes: String,
    // Delivery
    pickupOption: {
      type: String,
      enum: ["store_pickup", "home_delivery"],
      default: "store_pickup",
    },
    deliveryAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },
    notes: String,
    adminNote: String,
  },
  { timestamps: true }
);

rentalSchema.pre("save", async function (next) {
  if (!this.rentalNumber) {
    const count = await this.constructor.countDocuments();
    this.rentalNumber = `MKR-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Rental", rentalSchema);
