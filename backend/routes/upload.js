import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for direct upload to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder = "mayleki") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 1000, height: 1000, crop: "limit", quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    ).end(buffer);
  });
};

// @POST /api/upload/single — Upload one image
router.post("/single", protect, authorize("admin", "staff"), upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer, req.body.folder || "products");

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    next(err);
  }
});

// @POST /api/upload/multiple — Upload multiple images
router.post("/multiple", protect, authorize("admin", "staff"), upload.array("images", 8), async (req, res, next) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No files uploaded" });

    const uploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, req.body.folder || "products"))
    );

    res.json({
      success: true,
      images: uploads.map((r) => ({ url: r.secure_url, publicId: r.public_id })),
    });
  } catch (err) {
    next(err);
  }
});

// @DELETE /api/upload/:publicId — Delete from Cloudinary
router.delete("/:publicId", protect, authorize("admin"), async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(decodeURIComponent(req.params.publicId));
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
