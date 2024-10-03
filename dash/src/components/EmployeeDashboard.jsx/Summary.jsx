import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
// add

const SummaryCard = () => {
    const {user} = useAuth()
  return (
    <div className='p-6'>
    <div className='rounded flex bg-white '>

        <div className= {`text-3xl flex justify-center items-center bg-green-600 text-white px-4`}>  {/*will display the icon*/}
           <FaUser/>
        </div>
        <div className ='pl-4 py-1'>   {/*will display the total employees, and number  */}
            <p className="text-lg font-semibold">Welcome Back</p>
            <p className="text-xl font-bold">{user.name} </p>
        </div>
    </div>
</div>
   )
}

export default SummaryCard