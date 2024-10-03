import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/EmployeeDashboard/Sidebar'

// import SummaryCard from '../components/EmployeeDashboard/Summary'


const EmployeeDashboard = () => {
  return (
    <div className='flex'>

    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      {/* <SummaryCard /> */}
      <Outlet/>
    </div> 
    </div>
   

  )
}

export default EmployeeDashboard