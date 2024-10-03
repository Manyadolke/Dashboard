import React from 'react'

const SummaryCard = ({icon,text,number,color}) => {
  return (
    <div className='rounded flex bg-white'>

        <div className= {`text-3xl flex justify-center items-center ${color} text-white px-4`}>  {/*will display the icon*/}
           {icon}
        </div>
        <div className ='pl-4 py-1'>   {/*will display the total employees, and number  */}
            <p className="text-lg font-semibold">{text} </p>
            <p className="text-xl font-bold">{number} </p>
        </div>
    </div>
  )
}

export default SummaryCard