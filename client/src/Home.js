import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import SignUp from './signUp'

const Home = () => {
  return (
    <div className='container'>
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
        {/* <a className="nav-link" href="#">Pricing</a>
        <a className="nav-link disabled">Disabled</a> */}
      </div>
    </div>
  </div>
</nav>
{/* end of nav */}
<SignUp/>

    </div>
  )
}

export default Home
