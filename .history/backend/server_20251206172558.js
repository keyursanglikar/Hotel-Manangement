// // import express from 'express'
// // import cors from 'cors'
// // import { connectDB } from './config/db.js'
// // import foodRouter from './routes/foodRoute.js'
// // import userRouter from './routes/userRoute.js';
// // import 'dotenv/config';
// // import cartRouter from './routes/cartRoute.js';
// // import orderRouter from './routes/orderRoute.js';

// // //app config
// // const app = express()
// // const port = 4000

// // // middleware
// // app.use(express.json())
// // app.use(cors({
// //   origin: ["http://localhost:5173", "http://localhost:5174"],
// //   credentials: true
// // }));

// // //db connection
// // connectDB();

// // // api endpoints
// // app.use("/api/food",foodRouter)
// // app.use("/images",express.static('uploads'))
// // app.use('/api/user', userRouter)
// // app.use('/api/cart', cartRouter)
// // app.use('/api/order', orderRouter)

// // app.get("/",(req,res)=>{
// //         res.send("API working")
// // })

// // app.listen(port,()=>{
// //     console.log(`Server started on http://localhost:${port}`)
// // })

// //mongodb+srv://dulanjalisenarathna93:E2JUb0zfaT2FVp8D@cluster0.exkxkun.mongodb.net/?

// // In your backend index.js
// import express from 'express'
// import cors from 'cors'
// import { connectDB } from './config/db.js'
// import foodRouter from './routes/foodRoute.js'
// import userRouter from './routes/userRoute.js';
// import 'dotenv/config';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ES6 module equivalent of __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// //app config
// const app = express()
// const port = 4000

// // middleware
// app.use(express.json())
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:5174"],
//   credentials: true
// }));

// // Serve static files from uploads directory
// app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// // Also keep this for backward compatibility
// app.use("/images", express.static('uploads'))

// //db connection
// connectDB();

// // api endpoints
// app.use("/api/food",foodRouter)
// app.use("/api/user", userRouter)
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

// app.get("/",(req,res)=>{
//     res.send("API working")
// })

// app.listen(port,()=>{
//     console.log(`Server started on http://localhost:${port}`)
// })




// server.js or index.js
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express()
const port = process.env.PORT || 4000

// Define allowed origins for CORS
const allowedOrigins = [
  // Development URLs
  'http://localhost:5173',  // Admin dev
  'http://localhost:5174',  // Frontend dev
  
  // Production URLs (Update these with your actual Vercel URLs)
  'https://food-frontend.vercel.app',
  'https://food-admin.vercel.app',
  
  // Render backend URL (for testing)
  'https://hotel-manangement.onrender.com'
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log the blocked origin for debugging
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// Handle preflight requests
app.options('*', cors());

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
const uploadsPath = path.join(__dirname, 'uploads');
app.use("/uploads", express.static(uploadsPath));

// Also keep this for backward compatibility with old image paths
app.use("/images", express.static(uploadsPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

//db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Food Ordering API",
    version: "1.0.0",
    endpoints: {
      food: "/api/food",
      user: "/api/user", 
      cart: "/api/cart",
      order: "/api/order",
      uploads: "/uploads/:filename",
      health: "/api/health"
    },
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigins: allowedOrigins
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
  console.log(`Uploads directory: ${uploadsPath}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});