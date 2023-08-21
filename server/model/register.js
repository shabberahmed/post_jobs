import mongoose from "mongoose";
const Register=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    exp:String,

  
})
export default mongoose.model("registeredUsers",Register)