import express from "express";
import Policy from "../models/Policy.js";

const policyRouter = express.Router();

/**
 * GET Refund Policy (REAL TIME)
 */
policyRouter.get("/refund", async (req, res) => {
  try {
    const policy = await Policy.findOne({ type: "refund" });

    res.json({
      policy: policy?.content || "Refund policy not set yet.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE / CREATE Refund Policy (ADMIN USE)
 */
policyRouter.post("/refund", async (req, res) => {
  try {
    const { content } = req.body;

    const policy = await Policy.findOneAndUpdate(
      { type: "refund" },
      { content, type: "refund" },
      { new: true, upsert: true }
    );

    res.json({
      message: "Refund policy updated successfully",
      policy: policy.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET Delivery Policy
policyRouter.get("/delivery", async (req, res) => {
  try {
    const policy = await Policy.findOne({ type: "delivery" });

    res.json({
      policy: policy?.content || "Delivery information not set yet.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= DELIVERY POLICY =================

// GET Delivery
policyRouter.get("/delivery", async (req, res) => {
  try {
    const policy = await Policy.findOne({ type: "delivery" });

    res.json({
      policy: policy?.content || "Delivery information not set yet.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Delivery
policyRouter.post("/delivery", async (req, res) => {
  try {
    const { content } = req.body;

    const policy = await Policy.findOneAndUpdate(
      { type: "delivery" },
      { content, type: "delivery" },
      { new: true, upsert: true }
    );

    res.json({
      message: "Delivery policy updated successfully",
      policy: policy.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default policyRouter;