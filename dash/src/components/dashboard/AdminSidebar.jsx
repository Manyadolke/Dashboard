import React from 'react'
import {NavLink} from 'react-router-dom';
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa';



const AdminSidebar = () => {
  return (
    <div
     className="h-screen  text-white fixed lft-0 top-0 botton-0 space-y-2 w-64"
     style={{ background: '#1D262D ' }}>
        <div className ='flex items-center justify-center'
         style={{ background: '#222D33 ' }}>
            <h3 className='text-2xl  text-center py-4'>Employee MS</h3>
        </div>
        <div>
        <NavLink 
            to="/admin-dashboard"
            className="flex items-center space-x-4 block py-2.5 px-6 rounded"
            style={({ isActive }) => 
            isActive 
            ? { color: '#5EC16E' }  // Change icon and text color when active
            : { color: '#fff' }     // Default color
        }
        end
        >
            <FaTachometerAlt />
            <span>Dashboard</span>
        </NavLink>


            <NavLink to="/admin-dashboard/employees"
     className="flex items-center space-x-4 block py-2.5 px-6 rounded"
            style={({ isActive }) => 
            isActive 
            ? { color: '#5EC16E' }  // Change icon and text color when active
            : { color: '#fff' }     // Default color
        }
        >
                <FaUsers  />
                <span>Employee</span>
            </NavLink> 


            <NavLink to="/admin-dashboard/departments"
            className="flex items-center space-x-4 block py-2.5 px-6 rounded"
            style={({ isActive }) => 
            isActive 
            ? { color: '#5EC16E' }  // Change icon and text color when active
            : { color: '#fff' }     // Default color
        }>
                <FaBuilding/>
                <span>Department</span>
            </NavLink>



             <NavLink to="/admin-dashboard"
             className="flex items-center space-x-4 block py-2.5 px-6 rounded">
                <FaCalendarAlt/>
                <span>Leave</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary/add"
            className="flex items-center space-x-4 block py-2.5 px-6 rounded"
            style={({ isActive }) => 
            isActive 
            ? { color: '#5EC16E' }  // Change icon and text color when active
            : { color: '#fff' }     // Default color
        }>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard"
            className="flex items-center space-x-4 block py-2.5 px-6 rounded">
                <FaCogs/>
                <span>Settings</span>
            </NavLink>  

        </div>
    </div>
  )
}

export default AdminSidebar



// 
