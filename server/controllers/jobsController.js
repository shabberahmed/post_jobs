import io from "../index.js";
import auth from "../model/auth.js";
import jobModel from "../model/jobModel.js";
// .....post jobs......
 export const postJobController=async(req,res)=>{
const{appcode,projectId,modelId,version,title,description,post}=req.body;
const job=new jobModel(
    {appcode,projectId,modelId,version,title,description,post}
    );
    try{
      const x=  await job.save()
      const userId=await auth.findById(post)
      console.log(userId)
      userId.posts.push(x)
      userId.save()
      io.emit('one',job)
        res.json("job saved in data base")
    }
    catch{
        res.json({m:"not found"})
    }
}
// ........get_jobs data
export const getAllJobsController=async(req,res)=>{
    const data=await jobModel.find()
    try{
        res.send(data)  
    }
    catch(err){
        res.send(err)
    }
}
// -----delete job
// export const deleteJobController=async(req,res)=>{
//     const id=req.params.id
//     try{
//   const y=await jobModel.findByIdAndDelete(id)
//   const ab=await auth.find()
//         res.send("job deleted")
//     const p=    ab.map((val)=>val.posts)
//         console.log(p)
//         // userId.posts.push(x)
//         io.emit('del',y)
//         }
//     catch(err){
//         res.send(err)
//     }
// }
export const deleteJobController = async (req, res) => {
    const jobIdToDelete = req.params.id; // Assuming you're passing the job ID in the URL parameters

    try {
        // Find the job by its ID and delete it
        const deletedJob = await jobModel.findByIdAndDelete(jobIdToDelete);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Find the user and remove the job from the posts array
        const userId = await auth.findById(deletedJob.post);
        if (userId) {
            userId.posts.pull(jobIdToDelete); // Remove the job ID from the posts array
            await userId.save();
        }

        // Emit a deletion event to notify clients
        io.emit('delete', jobIdToDelete);

        return res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ----update user
export const updateJobcontroller=async(req,res)=>{
    const id=req.params.id
    // const title=req.body

    try{
      const y=  await jobModel.findByIdAndUpdate(id,req.body,{new:true})
      await io.emit('edit',y)
      console.log(y)
        res.send("updated succesfully")
    }
        catch{
            res.send("error id not found")
        }
}
// ------get single data
export const  singleData=async(req,res)=>{
const id=req.params.id;
// console.log(id)
try{
 const response= await jobModel.findById(id)
    res.json(response)
}
catch(err){
    res.send(err)
}
}
export const dataOne=async(req,res)=>{
    const id=req.params.id;
    const val=await auth.findById(id).populate('posts')
    console.log("hello")
    try{
        console.log(val)
        res.send(val)
    }
    catch(err){
        res.json({error:err})
    }
}   
