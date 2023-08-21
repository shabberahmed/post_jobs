import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Home from './Home'
// import PostJobs from './PostJobs'

const Login = () => {
    const [data,setData]=useState({email:"",password:""})
    const [message, setMessage] = useState('')
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const Api=async()=>{
        try{
         const response= await axios.post("http://localhost:1000/api/login",data)
         console.log(response.data,"full data")
         if (response.data.msg==="success") {
            setMessage(response.data.message);
            localStorage.setItem('id',response.data.id)
            localStorage.setItem('token',response.data.token)
            navigate("/addjob")
          } else {
            setMessage(response.data.message);
          }
        }
        catch(err){
            console.log(err)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        Api()
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
      <Link to="/login" className='nav-link active'>Login</Link>
       <Link className="nav-link active" to="/"> Home</Link>
        <Link className="nav-link active" to="signup">Signup</Link>
       
      </div>
    </div>
  </div>
</nav>
{/* <Home/> */}
    </div>
  <div className='d-flex justify-content-center'>
  <div  style={{width:"400px",height:"600px"}}>
  <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
      {message && <p className='text-danger'>{message}</p>}
            <label for="name">email</label>
            <input type="email" className='form-control' onChange={handleChange}  placeholder='email' name="email" value={data.email}/>
            <label for="password">password</label>
            <input type="password" className='form-control' onChange={handleChange}  placeholder='password' name="password" value={data.password}/>
            <input className='btn btn-primary m-3' type="submit" value="submit" />
        </form>
        </div>
  </div>
    </>
  )
}
export default Login