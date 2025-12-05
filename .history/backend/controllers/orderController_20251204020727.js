// import orderModel from './../models/orderModel.js';
// import userModel from './../models/userModel.js';
// import Stripe from "stripe"

// const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)

// // Placing user order for frontend
// const placeOrder = async (req, res) =>{

//     const frontend_url = 'http://localhost:5173';
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount:req.body.amount,
//             address: req.body.address
//         })

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data :{
//                 currency: "lkr",
//                 product_data:{
//                     name: item.name
//                 },
//                 unit_amount:item.price*100*300
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data :{
//                 currency:"lkr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//         })

//         res.json({success:true, session_url:session.url})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// const verifyOrder = async (req, res) =>{
//     const {orderId, success} = req.body;
//     try {
//         if(success=='true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true, message:"Paid"})
//         }else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false, message:"Not Paid"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// // user orders for frontend
// const userOrders = async (req,res) => {
//     try {
//         const orders = await orderModel.find({userId:req.body.userId})
//         res.json({success:true, data:orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// // listing orders for admin panel
// const listOrders = async (req,res) =>{
//    try {
//     const orders = await orderModel.find({});
//     res.json({success:true, data:orders})
//    } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})  
//    } 
// }

// // api for updating order status
// const updateStatus = async (req, res) =>{
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//         res.json({success:true, message:"Status Updated"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})  
//     }
// }

// export {placeOrder, verifyOrder, userOrders,listOrders, updateStatus}




// // backend/controllers/orderController.js
// import orderModel from './../models/orderModel.js';
// import userModel from './../models/userModel.js';
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Placing user order for frontend - UPDATED
// const placeOrder = async (req, res) => {
//     try {
//         const {
//             address,
//             items,
//             amount,
//             paymentMethod = 'stripe',
//             paymentDetails = {},
//             transactionId = '',
//             paymentId = ''
//         } = req.body;

//         const userId = req.userId;

//         // Create order data
//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod,
//             paymentDetails,
//             transactionId,
//             paymentId,
//             payment: paymentMethod === 'cod' || paymentMethod === 'counter' ? false : true
//         };

//         // Save order to database
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         // Clear user's cart after order
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Handle different payment methods
//         if (paymentMethod === 'stripe') {
//             // Stripe payment flow
//             const frontend_url = 'http://localhost:5173';
            
//             const line_items = items.map((item) => ({
//                 price_data: {
//                     currency: "lkr",
//                     product_data: {
//                         name: item.name
//                     },
//                     unit_amount: item.price * 100 * 300
//                 },
//                 quantity: item.quantity
//             }));

//             line_items.push({
//                 price_data: {
//                     currency: "lkr",
//                     product_data: {
//                         name: "Delivery Charges"
//                     },
//                     unit_amount: 2 * 100 * 80
//                 },
//                 quantity: 1
//             });

//             const session = await stripe.checkout.sessions.create({
//                 line_items: line_items,
//                 mode: 'payment',
//                 success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//                 cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//             });

//             return res.json({
//                 success: true,
//                 session_url: session.url,
//                 orderId: newOrder._id,
//                 orderNumber: newOrder.orderNumber
//             });
//         } else {
//             // For other payment methods (UPI, Card, COD, Counter)
//             return res.json({
//                 success: true,
//                 orderId: newOrder._id,
//                 orderNumber: newOrder.orderNumber,
//                 message: `Order placed successfully with ${paymentMethod.toUpperCase()} payment`
//             });
//         }
//     } catch (error) {
//         console.log("Place order error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error placing order"
//         });
//     }
// };

// // Verify stripe payment
// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === 'true') {
//             await orderModel.findByIdAndUpdate(orderId, { 
//                 payment: true,
//                 status: "Order Placed"
//             });
//             res.json({ 
//                 success: true, 
//                 message: "Payment Successful" 
//             });
//         } else {
//             await orderModel.findByIdAndUpdate(orderId, { 
//                 status: "Payment Failed" 
//             });
//             res.json({ 
//                 success: false, 
//                 message: "Payment Failed" 
//             });
//         }
//     } catch (error) {
//         console.log("Verify order error:", error);
//         res.json({ 
//             success: false, 
//             message: "Error verifying payment" 
//         });
//     }
// };

// // User orders for frontend
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.userId })
//             .sort({ date: -1 });
//         res.json({ 
//             success: true, 
//             data: orders 
//         });
//     } catch (error) {
//         console.log("User orders error:", error);
//         res.json({ 
//             success: false, 
//             message: "Error fetching orders" 
//         });
//     }
// };

// // Listing orders for admin panel
// const listOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({})
//             .populate('userId', 'name email')
//             .sort({ date: -1 });
//         res.json({ 
//             success: true, 
//             data: orders 
//         });
//     } catch (error) {
//         console.log("List orders error:", error);
//         res.json({ 
//             success: false, 
//             message: "Error fetching orders" 
//         });
//     }
// };

// // API for updating order status
// const updateStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
        
//         const validStatuses = [
//             "Food Processing",
//             "Order Placed",
//             "Preparing",
//             "Out for Delivery",
//             "Delivered",
//             "Cancelled",
//             "Payment Failed"
//         ];

//         if (!validStatuses.includes(status)) {
//             return res.json({
//                 success: false,
//                 message: "Invalid status"
//             });
//         }

//         const updatedOrder = await orderModel.findByIdAndUpdate(
//             orderId,
//             { status },
//             { new: true }
//         );

//         if (!updatedOrder) {
//             return res.json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Status Updated",
//             data: updatedOrder
//         });
//     } catch (error) {
//         console.log("Update status error:", error);
//         res.json({
//             success: false,
//             message: "Error updating status"
//         });
//     }
// };

// // Get order by ID
// const getOrderById = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const order = await orderModel.findById(orderId)
//             .populate('userId', 'name email phone');
        
//         if (!order) {
//             return res.json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         res.json({
//             success: true,
//             data: order
//         });
//     } catch (error) {
//         console.log("Get order error:", error);
//         res.json({
//             success: false,
//             message: "Error fetching order"
//         });
//     }
// };

// export { 
//     placeOrder, 
//     verifyOrder, 
//     userOrders, 
//     listOrders, 
//     updateStatus, 
//     getOrderById 
// };