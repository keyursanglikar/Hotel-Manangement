// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     userId:{type:String, required: true},
//     items:{type:Array, required: true},
//     amount:{type:Number, required: true},
//     address:{type:Object, required: true},
//     status:{type:String, default:"Food Processing"},
//     date:{type:Date, default:Date.now()},
//     payment:{type:Boolean, default:false},
// })

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

// export default orderModel;



// // backend/models/orderModel.js
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     },
//     items: { 
//         type: Array, 
//         required: true 
//     },
//     amount: { 
//         type: Number, 
//         required: true 
//     },
//     address: { 
//         type: Object, 
//         required: true 
//     },
//     status: { 
//         type: String, 
//         default: "Food Processing" 
//     },
//     date: { 
//         type: Date, 
//         default: Date.now 
//     },
//     payment: { 
//         type: Boolean, 
//         default: false 
//     },
//     // New fields for enhanced payment system
//     paymentMethod: {
//         type: String,
//         enum: ['upi', 'card', 'cod', 'counter', 'stripe'],
//         default: 'stripe'
//     },
//     paymentDetails: {
//         type: Object,
//         default: {}
//     },
//     transactionId: {
//         type: String,
//         default: ''
//     },
//     paymentId: {
//         type: String,
//         default: ''
//     },
//     orderNumber: {
//         type: String,
//         unique: true
//     },
//     deliveryInstructions: {
//         type: String,
//         default: ''
//     }
// });

// // Generate order number before saving
// orderSchema.pre('save', async function(next) {
//     if (!this.orderNumber) {
//         const count = await mongoose.model('order').countDocuments();
//         this.orderNumber = `ORD${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(4, '0')}`;
//     }
//     next();
// });

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;