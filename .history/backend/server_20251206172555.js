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