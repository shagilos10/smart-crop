import React from 'react'
import { Link } from 'react-router-dom'
import irrigation from '/src/assets/images/irrigation.png'
import rain from '/src/assets/images/Rain.png'
import tasklist from '/src/assets/images/Tasklist.png'
import wheat from '/src/assets/images/Wheat.png'
import report from '/src/assets/images/Bar Chart.png'



const Sidebar = () => {
  return (
    <div>
        <div className=' bg-green-700 w-84 h-full  text-white p-6 flex justify-center items-center'>
    <ul className='space-y-6'>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={wheat} alt="Wheat Icon" />
            <Link to='/croprecommendation' className=' transition duration-200'>Crop Recommendation</Link>
        </li>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={irrigation} alt="Irrigation Icon" />
            <Link to='/crops' className=' transition duration-200'>My Crops</Link>
        </li>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={rain} alt="Rain Icon" />
            <Link to='/weather' className=' transition duration-200'>Weather</Link>
        </li>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={report} alt="Report Icon" />
            <Link to='/reports' className=' transition duration-200'>Report and Analytics</Link>
        </li>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={report} alt="Report Icon" />
            <Link to='/schedule' className=' transition duration-200'>Schedule </Link>
        </li>
        <li className='flex gap-2 items-center hover:bg-green-600 p-2 rounded-2xl border-green-500 border-1 transition duration-200'>
            <img className='w-8' src={report} alt="Report Icon" />
            <Link to='/settings' className=' transition duration-200'>Setting </Link>
        </li>
    </ul>
</div>
      
    </div>
  )
}

export default Sidebar
