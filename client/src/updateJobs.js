import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateJobs = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const[data,setData]=useState({appcode:"",projectId:"",modelId:"",version:"",title:"",description:""})
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const apiJobData=async()=>{
            await axios.put(`http://localhost:1000/api/jobs/${id}`,data)
    }
    const jobsApi=async()=>{
        const response=await axios.get(`http://localhost:1000/api/jobs/${id}`);
        try{
         const objData=response.data
         console.log(response)
         setData(objData)
        }
        catch(err){
         console.log(err)
        }
         }
         useEffect(()=>{
            jobsApi()
         },[])
    const handleSubmit=()=>{
        apiJobData()
        navigate("/addjob")

      }
  return (
  <>
    <div>
        hello
        <form onSubmit={handleSubmit}> 
            <input type="text" onChange={handleChange} name="appcode"placeholder='app code' value={data.appcode}/>
            <br/>
            <input type="text" onChange={handleChange} name="projectId" placeholder="project id" value={data.projectId} />
            <br/>
            
            <input type="text" onChange={handleChange} name="modelId" placeholder='model id' value={data.modelId}/>
            <br/>
            <input type="text" onChange={handleChange} name="version" placeholder='version' value={data.version} />
            <br/>
            <input type="text" onChange={handleChange} name="title" placeholder='title' value={data.title} />
            <br/>
            <input type="text" onChange={handleChange} name="description" placeholder='description' value={data.description}/>
            <br/>
            <input type="submit"  value="submit"/>
        </form>
        </div>
  </>
  )
}

export default UpdateJobs
