import React, { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/home/home'
import {Route,Routes} from 'react-router-dom'
import Video from './Pages/Video/video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  
   const [sideNavbar,setsideNavbar] = useState(true);

 const setSideNavbarFunc=(value)=>{
    setsideNavbar(value)
  }

  return (
    <>
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar}></Home>}></Route>
        <Route path='/watch/:id' element={<Video></Video>}></Route>
        <Route path='/user/:id' element={ <Profile  sideNavbar={sideNavbar}></Profile>}></Route>
        <Route path='/:id/upload' element={<VideoUpload/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
      
    </div>
     
    </>
  )
}

export default App
