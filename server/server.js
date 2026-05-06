
// console.log("Policy router loaded:", policyRouter);


// const app = express();


// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// // Allow multiple origins
// // const allowedOrigins = ['http://localhost:5173', 'https://greencart-1430muhol-vikash9131s-projects.vercel.app'];
// // const allowedOrigins = [
// //   "http://localhost:5173",
// //   "https://greencart-git-main-vikash9131s-projects.vercel.app"
// // ];

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://greencart-six-iota.vercel.app"
// ];

// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// // Middleware configuration
// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors({origin: allowedOrigins, credentials: true}));
// // app.use(cors({
// //   origin: function(origin, callback) {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("CORS not allowed"));
// //     }
// //   },
// //   credentials: true
// // }));



// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://greencart-six-iota.vercel.app"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

// // ✅ ORDER IS IMPORTANT
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// app.use(express.json());
// app.use(cookieParser());

// // routes
// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter);
// app.use('/api/seller', sellerRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/address', addressRouter);
// app.use('/api/order', orderRouter);
// app.use("/api/policy", policyRouter);


// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })

// // app.use("/api/policy", policyRouter);

// // const server = app.listen(port, () => {
// //     console.log("Server actually listening on:", server.address());
// // });
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import policyRouter from "./routes/policyRoute.js";

const app = express();

const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://greencart-six-iota.vercel.app",
  "https://greencart-ky9wbsnll-vikash9131s-projects.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowed =
      origin.includes("localhost") ||
      origin.endsWith(".vercel.app");

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ⚠️ STRIPE ROUTE FIRST (IMPORTANT)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// middlewares
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/policy', policyRouter);

// start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
export default app;