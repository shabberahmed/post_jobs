import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { socket } from './signUp'
const PostJobs = () => {
  const id=localStorage.getItem('id')
  const token=localStorage.getItem('token')
  console.log(id)
    const[data,setData]=useState({appcode:"",projectId:"",modelId:"",version:"",title:"",description:"",post:id})
    const[apiData,setApidata]=useState([])
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const navigate =useNavigate()
    const jobsApi=async()=>{
      let instance=await axios.create({
        baseURL:"http://localhost:1000",
        headers:{
          'x-auth':token
        }
      })
        try{
          const response=await instance.get(`/api/ip/${id}`);
            const values=response.data.posts
            console.log(values,"values")
            setApidata(values)
        }
        catch(err){
          // window.location.reload(true);
          console.log('this some thing')
          localStorage.removeItem('id')
          redirect('/')
          localStorage.removeItem('token')
            console.log(err)
        }
    }
    useEffect(()=>{
        jobsApi()
       
    },[])
   
    const postJobsApi=async()=>{
            try{
              await axios.post("http://localhost:1000/api/jobs",data)
                alert("posted job success fully")
            }
            catch(err){
                alert(err)
                console.log(err)
            }
        }
        const handleSubmit=()=>{
          postJobsApi()
        }
        // const deleteJob=async(id)=>{
        //     try{
        //         console.log(id)
        //         axios.delete(`http://localhost:1000/api/jobs/${id}`)
        //         console.log(" deleted succesfully")
        //         jobsApi()
        //         alert("deleted")
               
        //     }
        //     catch{
        //         console.log("not deleted")
        //     }
        // }
        // import axios from 'axios';

    const deleteJob = async (id) => {
          try {
              console.log(id);
      
              const response = await axios.delete(`http://localhost:1000/api/jobs/${id}`);
              
              if (response.status === 200) {
                  console.log("Deleted successfully");
                  alert("Deleted");
                  jobsApi()
              } else {
                  console.log("Deletion failed");
              }
          } catch (error) {
              console.error("Error deleting job:", error);
          }
      };
      
   

        const ax=()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('id')
        }
  return (
  <>
    <div>
      
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Jobs</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      {/* <Link to="" className='nav-link active'>Login</Link>
       <Link className="nav-link active" to="/"> Home</Link> */}
       <Link onClick={ax} className="nav-link active " to="/">Logout</Link>
        {/* <a className="nav-link" href="#">Pricing</a>
        <a className="nav-link disabled">Disabled</a> */}
      </div>
    </div>
  </div>
</nav>

        {/* nav end */}
        <div>
        <form className='m-5' onSubmit={handleSubmit} style={{width:"400px"}}> 
            <input type="text" onChange={handleChange} className='form-control' name="appcode"placeholder='app code'/>
            <br/>
            <input type="text" onChange={handleChange} className='form-control' name="projectId" placeholder="project id" />
            <br/>
            
            <input type="text" onChange={handleChange} className='form-control' name="modelId" placeholder='model id'/>
            <br/>
            <input type="text" onChange={handleChange} className='form-control' name="version" placeholder='version' />
            <br/>
            <input type="text" onChange={handleChange} className='form-control' name="title" placeholder='title' />
            <br/>
            <input type="text" onChange={handleChange} className='form-control' name="description" placeholder='description'/>
            <br/>
            <input className='btn btn-success' type="submit"  value="post the job"/>
        </form>
        </div>
        <div>
        <div className='row d-flex justify-content-between'>
{
    apiData.map((val)=>{
        return(
         
          <div className='col-4' key={val._id}>
          <div className="card" style={{width: "18rem"}} >
    <h4 className="card-header" >{val.title}</h4>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{val.projectId}</li>
    <li className="list-group-item">{val.modelId}</li>
    <li className="list-group-item">{val.appcode}</li>
    <li className="list-group-item">{val.version}</li>
    <li className="list-group-item">{val.description}</li>


  </ul>
  <div className="card-footer">
    <button className='btn btn-danger ms-5' onClick={()=>deleteJob(val._id)}>delete</button>
   <Link  className='btn btn-warning active ms-5' to={`/update/${val._id}`} >Edit</Link>
  </div>
</div>
          </div>
           
        )
    })
}
</div>
        </div>
        </div>
  </>
  )
}


export default PostJobs
