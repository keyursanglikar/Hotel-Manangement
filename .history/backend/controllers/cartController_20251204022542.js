// import userModel from './../models/userModel.js';

// // add items to user cart
// const addToCart = async (req,res) =>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId] = 1 
//         }
//         else{
//             cartData[req.body.itemId] += 1;
//         }

//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({success:true,message:'Added to cart'});
//     } catch (error) {
//        console.log(error) ;
//        res.json({success:false,message:'Error'});
//     }
// }

// // remove items to user cart
// const removeFromCart = async (req, res) =>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;

//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId] -=1;
//         }

//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:'Removed from cart'});
//     } catch (error) {
//         console.log(error) ;
//        res.json({success:false,message:'Error'});
//     }
// }

// // fetch user cart data
// const getCart = async (req,res) =>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         res.json({success:true,cartData});
//     } catch (error) {
//         console.log(error) ;
//         res.json({success:false,message:'Error'});
//     }
// }


// const clearCart = async (req, res) => {
//     try {
//         const userId = req.userId;
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });
//         res.json({ success: true, message: "Cart cleared" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error clearing cart" });
//     }
// };

// // Add this to your exports
// export { addToCart, getCart, removeFromCart, clearCart };






// backend/controllers/cartController.js
import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Initialize cartData if it doesn't exist
        if (!user.cartData) {
            user.cartData = {};
        }

        if (!user.cartData[itemId]) {
            user.cartData[itemId] = 1;
        } else {
            user.cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData: user.cartData });
        
        res.json({
            success: true,
            message: "Added to cart"
        });
    } catch (error) {
        console.log("Add to cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error adding to cart"
        });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Initialize cartData if it doesn't exist
        if (!user.cartData) {
            user.cartData = {};
        }

        if (user.cartData[itemId] > 0) {
            user.cartData[itemId] -= 1;
            
            // Remove item if quantity becomes 0
            if (user.cartData[itemId] === 0) {
                delete user.cartData[itemId];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: user.cartData });
        
        res.json({
            success: true,
            message: "Removed from cart"
        });
    } catch (error) {
        console.log("Remove from cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error removing from cart"
        });
    }
};

// Get cart data
const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return cart data or empty object
        const cartData = user.cartData || {};
        
        res.json({
            success: true,
            cartData: cartData
        });
    } catch (error) {
        console.log("Get cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error getting cart data"
        });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.userId;

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        
        res.json({
            success: true,
            message: "Cart cleared"
        });
    } catch (error) {
        console.log("Clear cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error clearing cart"
        });
    }
};

export { addToCart, removeFromCart, getCart, clearCart };