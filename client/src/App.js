import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from './signUp'
import Login from './Login'
import PostJobs from './PostJobs'
import UpdateJobs from './updateJobs'
import Home from './Home'
const App = () => {
  return (
<>

<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/signup" element={<SignUp/>} />
  <Route path="/login" element={<Login/>}  />
  <Route path='/addjob' element={<PostJobs/>}></Route>
  <Route path='/update/:id' element={<UpdateJobs/>}></Route>
</Routes>
</BrowserRouter>
</>
  )
}

export default App