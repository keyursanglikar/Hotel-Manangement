// import fs from 'fs'
// import foodModel from '../models/foodModel.js'

// //add food item

// const addFood = async (req,res) =>{

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name: req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename
//     })

//     try {
//         await food.save();
//         res.json({success:true,message:'Food Added'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// // All food list

// const listFood = async (req,res) =>{
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// // remove food item

// const removeFood = async (req,res)=>{
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({success:true,message:'Food Removed'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// export {addFood, listFood, removeFood}




// backend/controllers/foodController.js
import fs from 'fs'
import foodModel from '../models/foodModel.js'
import path from 'path';

//add food item
const addFood = async (req,res) =>{
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file uploaded' });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: 'Food Added', food: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding food' });
    }
}

// All food list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching food list' });
    }
}

// remove food item
const removeFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        // Delete the image file
        const imagePath = path.join('uploads', food.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error removing food' });
    }
}

export {addFood, listFood, removeFood}