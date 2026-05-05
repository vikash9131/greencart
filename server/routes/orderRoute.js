// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
// import authSeller from '../middlewares/authSeller.js';

// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)

// export default orderRouter;

import mongoose from "mongoose";
import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe
} from '../controllers/orderController.js';

import Order from '../models/Order.js';

const orderRouter = express.Router();

// ================= EXISTING ROUTES =================
orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// ================= NEW: TRACK ORDER =================
orderRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      status: order.status,
      amount: order.amount,
      items: order.items
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default orderRouter;