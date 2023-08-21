import axios from 'axios'
import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import io from 'socket.io-client';  
export const  socket = io.connect('http://localhost:1000') 
const SignUp = () => {
    const[data,setData]=useState({email:"",password:"",name:""})
    const[jobData,setJobData]=useState([])
    const navigate=useNavigate()
    const Api=async()=>{
            try{
                await axios.post("http://localhost:1000/api/signup",data)
               alert("data send")
               navigate("/login")
            }
            catch{
                alert("error")
            }
    }
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const jobsApi=async()=>{
   const response=await axios.get("http://localhost:1000/api/jobs1");
   try{
    const objData=response.data
    // console.log(objData)
    setJobData(objData)
   }
   catch(err){
    console.log(err)
   }
    }
    useEffect(()=>{
        jobsApi()
        socket.on('one',(data)=>{
            setJobData((val)=>[...val,data])
            console.log(jobData)
        })
        socket.on('del', (deletedJob) => {
            setJobData((prevData) => prevData.filter((job) => job._id !== deletedJob._id))
          });
              socket.on('edit', (updatedJob) => {
            console.log('Received edit event:', updatedJob);
         setJobData((prevData) =>
              prevData.map((job) => (job._id === updatedJob._id?updatedJob:job ))
            );
          });
        return ()=>{
            socket.off('one');
            socket.off('del');
            socket.off('edit');
        }
    },[])
const handleSubmit=(e)=>{
    e.preventDefault()
    Api()
}
  return (
<>
<div>
    {/* sign up data */}
<div className='mx-auto' style={{width:"400px"}}>
    <h1>SignUp</h1>
<form onSubmit={handleSubmit}>
    <input className='form-control' type="name" placeholder='name' onChange={handleChange} name="name" value={data.name} />
    <br/>
    <input className='form-control' type="email" placeholder='email' onChange={handleChange} name="email" value={data.email}/>
    <br/>

    <input className='form-control' type="password" name="password" onChange={handleChange} placeholder='password' value={data.password} />
    <br/>

   <div className='d-flex justify-content-center'>
   <input type="submit" className='btn btn-info ' value="submit"/>
   </div>

</form>
</div>
{/* jobs data---- to display */}
<div className='row '>
{
    jobData.map((val)=>{
        return(
          
<div key={val._id} className='col-4 d-flex justify-content-between mt-2'>
<div className="card" style={{width: "18rem"}}>
    <h4 className="card-header" >{val.title}</h4>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{val.projectId}</li>
    <li className="list-group-item">{val.modelId}</li>
    <li className="list-group-item">{val.version}</li>
    <li className="list-group-item">{val.description}</li>
  </ul>
</div>
<div className="d-flex justify-content-center">
    <button className="btn btn-success btn-lg" >register</button>
  </div>
</div>
            // </>
        )
    })
}

</div>

</div>
</>
  )
}

export default SignUp
