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










// // backend/controllers/orderController.js
// import orderModel from './../models/orderModel.js';
// import userModel from './../models/userModel.js';

// // Placing user order for frontend - SIMPLIFIED WITHOUT STRIPE
// const placeOrder = async (req, res) => {
//     try {
//         const {
//             address,
//             items,
//             amount,
//             paymentMethod = 'cod',
//             paymentDetails = {},
//             transactionId = '',
//             paymentId = ''
//         } = req.body;

//         const userId = req.userId;

//         console.log("Order received:", {
//             userId,
//             itemsCount: items?.length,
//             amount,
//             paymentMethod
//         });

//         // Validate required fields
//         if (!address || !items || !amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields"
//             });
//         }

//         // Generate order number
//         const orderCount = await orderModel.countDocuments();
//         const orderNumber = `ORD${Date.now().toString().slice(-6)}${(orderCount + 1).toString().padStart(4, '0')}`;

//         // Create order data
//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod,
//             paymentDetails,
//             transactionId: transactionId || `TXN${Date.now()}`,
//             paymentId: paymentId || `PAY${Date.now()}`,
//             payment: paymentMethod === 'cod' || paymentMethod === 'counter' ? false : true,
//             orderNumber,
//             status: paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Order Placed' : 'Payment Pending'
//         };

//         // Save order to database
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         console.log("Order saved:", newOrder._id);

//         // Clear user's cart after order
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Simulate payment processing for non-COD methods
//         let paymentSuccess = false;
//         if (paymentMethod !== 'cod' && paymentMethod !== 'counter') {
//             // Simulate payment processing with 95% success rate
//             paymentSuccess = Math.random() < 0.95;
            
//             if (paymentSuccess) {
//                 await orderModel.findByIdAndUpdate(newOrder._id, {
//                     payment: true,
//                     status: 'Order Placed'
//                 });
//             } else {
//                 await orderModel.findByIdAndUpdate(newOrder._id, {
//                     status: 'Payment Failed'
//                 });
//             }
//         }

//         return res.json({
//             success: true,
//             orderId: newOrder._id,
//             orderNumber: newOrder.orderNumber,
//             paymentSuccess: paymentMethod === 'cod' || paymentMethod === 'counter' ? true : paymentSuccess,
//             message: paymentMethod === 'cod' || paymentMethod === 'counter' 
//                 ? `Order placed successfully. Pay ₹${amount} on ${paymentMethod === 'cod' ? 'delivery' : 'pickup'}`
//                 : paymentSuccess 
//                     ? `Payment successful! Order placed with ${paymentMethod.toUpperCase()}`
//                     : `Payment failed. Please try again`
//         });

//     } catch (error) {
//         console.log("Place order error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error placing order",
//             error: error.message
//         });
//     }
// };

// // Verify order (for future use)
// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === 'true' || success === true) {
//             await orderModel.findByIdAndUpdate(orderId, { 
//                 payment: true,
//                 status: "Order Placed"
//             });
//             res.json({ 
//                 success: true, 
//                 message: "Payment Verified" 
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
//         const order = await orderModel.findById(orderId);
        
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







// // backend/controllers/orderController.js
// import orderModel from './../models/orderModel.js';
// import userModel from './../models/userModel.js';

// // Placing user order for frontend
// const placeOrder = async (req, res) => {
//     try {
//         const {
//             address,
//             items,
//             amount,
//             paymentMethod = 'cod',
//             paymentDetails = {},
//             transactionId = '',
//             paymentId = ''
//         } = req.body;

//         // Get userId from req (set by auth middleware)
//         const userId = req.userId;

//         console.log("Order received:", {
//             userId,
//             itemsCount: items?.length,
//             amount,
//             paymentMethod,
//             hasUserId: !!userId
//         });

//         // Validate required fields
//         if (!userId) {
//             console.error("Missing userId in request");
//             return res.status(401).json({
//                 success: false,
//                 message: "User not authenticated"
//             });
//         }

//         if (!address || !items || !amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields"
//             });
//         }

//         // Generate order number
//         const orderCount = await orderModel.countDocuments();
//         const orderNumber = `ORD${Date.now().toString().slice(-6)}${(orderCount + 1).toString().padStart(4, '0')}`;

//         // Create order data
//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod,
//             paymentDetails,
//             transactionId: transactionId || `TXN${Date.now()}`,
//             paymentId: paymentId || `PAY${Date.now()}`,
//             payment: paymentMethod === 'cod' || paymentMethod === 'counter' ? false : true,
//             orderNumber,
//             status: paymentMethod === 'cod' || paymentMethod === 'counter' ? 'Order Placed' : 'Payment Pending'
//         };

//         console.log("Creating order with data:", orderData);

//         // Save order to database
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         console.log("Order saved successfully:", newOrder._id);

//         // Clear user's cart after order
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Simulate payment processing for non-COD methods
//         let paymentSuccess = false;
//         if (paymentMethod !== 'cod' && paymentMethod !== 'counter') {
//             // Simulate payment processing with 95% success rate
//             paymentSuccess = Math.random() < 0.95;
            
//             if (paymentSuccess) {
//                 await orderModel.findByIdAndUpdate(newOrder._id, {
//                     payment: true,
//                     status: 'Order Placed'
//                 });
//             } else {
//                 await orderModel.findByIdAndUpdate(newOrder._id, {
//                     status: 'Payment Failed'
//                 });
//             }
//         } else {
//             // For COD and Counter, payment is considered successful
//             paymentSuccess = true;
//         }

//         return res.json({
//             success: true,
//             orderId: newOrder._id,
//             orderNumber: newOrder.orderNumber,
//             paymentSuccess: paymentSuccess,
//             message: paymentMethod === 'cod' || paymentMethod === 'counter' 
//                 ? `Order placed successfully. Pay ₹${amount} on ${paymentMethod === 'cod' ? 'delivery' : 'pickup'}`
//                 : paymentSuccess 
//                     ? `Payment successful! Order placed with ${paymentMethod.toUpperCase()}`
//                     : `Payment failed. Please try again`
//         });

//     } catch (error) {
//         console.log("Place order error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error placing order",
//             error: error.message
//         });
//     }
// };

// // Verify order
// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === 'true' || success === true) {
//             await orderModel.findByIdAndUpdate(orderId, { 
//                 payment: true,
//                 status: "Order Placed"
//             });
//             res.json({ 
//                 success: true, 
//                 message: "Payment Verified" 
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
//         const userId = req.userId;
//         console.log("Fetching orders for user:", userId);
        
//         const orders = await orderModel.find({ userId: userId })
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
//         const order = await orderModel.findById(orderId);
        
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









// backend/controllers/orderController.js
import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';

// Placing user order for frontend
const placeOrder = async (req, res) => {
    try {
        const {
            address,
            items,
            amount,
            paymentMethod = 'cod',
            paymentDetails = {},
            transactionId = '',
            paymentId = ''
        } = req.body;

        // Get userId from req (set by auth middleware)
        const userId = req.userId;

        console.log("Order received:", {
            userId,
            itemsCount: items?.length,
            amount,
            paymentMethod,
            hasUserId: !!userId
        });

        // Validate required fields
        if (!userId) {
            console.error("Missing userId in request");
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!address || !items || !amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Generate order number
        const orderCount = await orderModel.countDocuments();
        const orderNumber = `ORD${Date.now().toString().slice(-6)}${(orderCount + 1).toString().padStart(4, '0')}`;
        
        // Generate receipt number
        const receiptNumber = `RCP${Date.now().toString().slice(-6)}${(orderCount + 1).toString().padStart(4, '0')}`;

        // Set payment status based on method
        let payment = false;
        let counterPaymentStatus = 'pending';
        
        if (paymentMethod === 'cod' || paymentMethod === 'counter') {
            payment = false;
            counterPaymentStatus = 'pending';
        } else {
            // Simulate online payment with 95% success rate
            payment = Math.random() < 0.95;
        }

        // Create order data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            paymentDetails,
            transactionId: transactionId || `TXN${Date.now()}`,
            paymentId: paymentId || `PAY${Date.now()}`,
            payment: payment,
            orderNumber,
            receiptNumber,
            status: payment ? 'Order Placed' : 'Payment Pending',
            counterPaymentStatus: counterPaymentStatus,
            receiptGenerated: false
        };

        console.log("Creating order with data:", orderData);

        // Save order to database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        console.log("Order saved successfully:", newOrder._id);

        // Clear user's cart after order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        return res.json({
            success: true,
            orderId: newOrder._id,
            orderNumber: newOrder.orderNumber,
            receiptNumber: newOrder.receiptNumber,
            paymentSuccess: payment,
            paymentMethod: paymentMethod,
            message: paymentMethod === 'cod' || paymentMethod === 'counter' 
                ? `Order placed successfully. Payment status: Pending`
                : payment 
                    ? `Payment successful! Order placed with ${paymentMethod.toUpperCase()}`
                    : `Payment failed. Please try again`
        });

    } catch (error) {
        console.log("Place order error:", error);
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message
        });
    }
};

// Update counter payment status
const updateCounterPayment = async (req, res) => {
    try {
        const { orderId, paymentStatus } = req.body;
        const userId = req.userId;

        // Find the order
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Check if user owns this order
        if (order.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this order"
            });
        }

        // Validate payment status
        if (!['paid', 'not_paid'].includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status. Use 'paid' or 'not_paid'"
            });
        }

        // Update payment status
        const updateData = {
            counterPaymentStatus: paymentStatus,
            counterPaymentTime: new Date()
        };

        if (paymentStatus === 'paid') {
            updateData.payment = true;
            updateData.status = 'Order Placed';
        } else {
            updateData.payment = false;
            updateData.status = 'Payment Failed';
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        res.json({
            success: true,
            message: `Payment marked as ${paymentStatus}`,
            data: updatedOrder
        });

    } catch (error) {
        console.log("Update counter payment error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating payment status"
        });
    }
};

// Mark receipt as generated
const markReceiptGenerated = async (req, res) => {
    try {
        const { orderId } = req.body;
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { receiptGenerated: true },
            { new: true }
        );

        res.json({
            success: true,
            message: "Receipt marked as generated",
            data: updatedOrder
        });

    } catch (error) {
        console.log("Mark receipt error:", error);
        res.status(500).json({
            success: false,
            message: "Error marking receipt"
        });
    }
};

// Get order by ID for receipt
const getOrderForReceipt = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.log("Get order error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching order"
        });
    }
};

// Verify order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true' || success === true) {
            await orderModel.findByIdAndUpdate(orderId, { 
                payment: true,
                status: "Order Placed"
            });
            res.json({ 
                success: true, 
                message: "Payment Verified" 
            });
        } else {
            await orderModel.findByIdAndUpdate(orderId, { 
                status: "Payment Failed" 
            });
            res.json({ 
                success: false, 
                message: "Payment Failed" 
            });
        }
    } catch (error) {
        console.log("Verify order error:", error);
        res.json({ 
            success: false, 
            message: "Error verifying payment" 
        });
    }
};

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Fetching orders for user:", userId);
        
        const orders = await orderModel.find({ userId: userId })
            .sort({ date: -1 });
            
        res.json({ 
            success: true, 
            data: orders 
        });
    } catch (error) {
        console.log("User orders error:", error);
        res.json({ 
            success: false, 
            message: "Error fetching orders" 
        });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .sort({ date: -1 });
        res.json({ 
            success: true, 
            data: orders 
        });
    } catch (error) {
        console.log("List orders error:", error);
        res.json({ 
            success: false, 
            message: "Error fetching orders" 
        });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        const validStatuses = [
            "Food Processing",
            "Order Placed",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Payment Failed"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            message: "Status Updated",
            data: updatedOrder
        });
    } catch (error) {
        console.log("Update status error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating status"
        });
    }
};

export { 
    placeOrder, 
    verifyOrder, 
    userOrders, 
    listOrders, 
    updateStatus, 
    getOrderForReceipt,
    updateCounterPayment,
    markReceiptGenerated
};