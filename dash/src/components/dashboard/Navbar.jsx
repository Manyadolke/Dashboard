import React from 'react'
import { useAuth } from '../../context/authContext'


const Navbar = () => {
    const {user,logout}= useAuth()
  return (
    <div className='flex items-center text-gray-600 justify-between h-16 px-7'
      style={{ background: '#C9CCD8 ' }}>
        <p className='text-lg'>Welcome, {user.name}</p>
        <button className ='px-4 py-1 bg-white hover:bg-green-600' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar

// add