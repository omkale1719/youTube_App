import React from 'react'
import Sidenavbar from '../../Components/SideNavbar/sidenavbar'
import Homepage from '../../Components/HomePage/homepage'
import './home.css'

const Home = ({sideNavbar}) => {
  return (
    <div>
        <Sidenavbar sideNavbar={sideNavbar}></Sidenavbar>
        <Homepage sideNavbar={sideNavbar}></Homepage>
    </div>
  )
}

export default Home