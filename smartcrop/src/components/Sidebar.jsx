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
        <div className='bg-green-700 w-64 h-screen text-white p-4 flex justify-center items-center '>
            <ul className='space-y-8'>
                <li className='flex gap-1 items-center'>
                    <img className='w-8' src={wheat} alt="" />
                    <Link to='/croprecommendation'>crop Recommendation</Link>

                </li>
                <li className='flex gap-1 items-center'>
                    <img className='w-8' src={irrigation} alt="" />
                    <Link to='/crops'>My Crops</Link>

                </li>
                <li className='flex gap-1 items-center'>
                    <img className='w-8' src={tasklist} alt="" />
                    <Link to='/tasks'>Tasks</Link>

                </li>
                <li className='flex gap-1 items-center'>
                    <img className='w-8' src={rain} alt="" />
                    <Link to='/weather'>Weather</Link>

                </li>
                <li className='flex gap-1 items-center'>
                    <img className='w-8' src={report} alt="" />
                    <Link to='/reports'>Report and Analytics</Link>

                </li>
                
            </ul>

        </div>
      
    </div>
  )
}

export default Sidebar
