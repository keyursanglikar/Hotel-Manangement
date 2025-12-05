import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://creedgamingsk_db_user:Creed%40sk2023@projects.z3voxih.mongodb.net/Food-D').then(()=>{
       console.log('DB connected') ;
    })
}