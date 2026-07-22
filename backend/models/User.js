import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, minlength: 6 },
    role: { type: String, enum: ["customer", "admin", "staff"], default: "customer" },
    avatar: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    // Address
    addresses: [
      {
        label: String,
        name: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: { type: String, default: "Maharashtra" },
        pincode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    // Wishlist
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // Orders
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    // Auth
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    otp: String,
    otpExpiry: Date,
    refreshToken: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
