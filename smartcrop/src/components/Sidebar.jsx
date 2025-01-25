import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div className='bg-green-700 w-64 h-screen text-white p-4 flex justify-center items-center'>
            <ul>
                <li>
                    <Link to='/croprecommendation'>crop Recommendation</Link>

                </li>
                <li>
                    <Link to='/crops'>My Crops</Link>

                </li>
                <li>
                    <Link to='/tasks'>Tasks</Link>

                </li>
                
            </ul>

        </div>
      
    </div>
  )
}

export default Sidebar
