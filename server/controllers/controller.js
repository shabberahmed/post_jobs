import Jwt from "jsonwebtoken";
import auth from "../model/auth.js";
import bcrypt from "bcrypt"

export const login=async(req,res)=>{
    const{email,password}=req.body;
    const val=await auth.findOne({email})
    try{
        if(val){
            const match=await bcrypt.compare(password,val.password)
            if(match){
                const token=Jwt.sign({email},process.env.ACCESS,{expiresIn:'1m'})
                console.log(token,'this token')
                res.json({msg:"success",id:val._id,token:token})
            }
            else{
                res.json({
                    message:"wrong password"
                })
            }
        }
        else{
            res.json({
                message:"invalid credentials"
            })
        }
    }
    catch(err){
        res.json({
            message:err
        })
    }
}
  
export const signUp=async(req,res)=>{
    const{email,name,password}=req.body;
    const hashpassword=bcrypt.hashSync(password,10)
    const newData=new auth({
        name:name,
        email:email,
        password:hashpassword
    })
    try{
        await newData.save()
        res.send("data sent")
    }
    catch{
        res.send("data not sent")
        console.log("some eroor")
    }
    
}