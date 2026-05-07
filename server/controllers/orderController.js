
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

// ✅ Currency conversion
const USD_TO_INR = 93;

// =========================
// Place Order COD
// =========================
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // ✅ Calculate amount in INR
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (
        (await acc) +
        product.offerPrice * USD_TO_INR * item.quantity
      );
    }, 0);

    // ✅ Add Tax (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount, // ✅ stored in INR
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// =========================
// Place Order Stripe
// =========================
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];

    // ✅ Calculate amount in INR
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);

      const priceINR = product.offerPrice * USD_TO_INR;

      productData.push({
        name: product.name,
        price: priceINR, // ✅ INR
        quantity: item.quantity,
      });

      return (await acc) + priceINR * item.quantity;
    }, 0);

    // ✅ Add Tax
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount, // ✅ stored in INR
      address,
      paymentType: "Online",
    });

    // ================= Stripe =================
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr", // ✅ FIXED
        product_data: {
          name: item.name,
        },
        // Stripe uses paise → multiply by 100
        unit_amount: Math.floor(item.price * 1.02) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// =========================
// Stripe Webhooks
// =========================
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const { orderId, userId } = session.data[0].metadata;

      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const { orderId } = session.data[0].metadata;

      await Order.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.error(`Unhandled event type ${event.type}`);
  }

  response.json({ received: true });
};

// =========================
// Get User Orders
// =========================
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =========================
// Get All Orders
// =========================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};