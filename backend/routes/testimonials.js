import express from "express";
const router = express.Router();
router.get("/", async (req, res) => { res.json({ success: true, data: [] }); });
router.post("/", async (req, res) => { res.status(201).json({ success: true, data: req.body }); });
export default router;
