import mongoose from "mongoose";

const jobModel=mongoose.Schema({
    appcode:String,
    projectId:String,
    modelId:String,
    version:String,
    title:String,
    description:String,
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
 
},
{timestamps:true}
)
export default mongoose.model("jobai",jobModel)
