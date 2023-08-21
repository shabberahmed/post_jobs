import mongoose from "mongoose";
 const conn=async()=>{
   await mongoose.connect(process.env.URL)
    .then(()=>console.log("connected to mongoose"))
    .catch(()=>console.log("mongoose error"))
 } 
 export default conn