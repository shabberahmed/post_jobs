import mongoose from "mongoose";
const signupData=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"jobai"
     }]
})
signupData.set('strictPopulate', false);

export default mongoose.model("user",signupData)