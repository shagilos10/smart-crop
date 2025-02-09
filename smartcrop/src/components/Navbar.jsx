import React from 'react';
import { Link } from 'react-router-dom';
import g16 from '../assets/images/g16.svg'

const Navbar = () => {
  return (
    <nav className="fixed bg-white p-4 w-screen ">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex items-center'>
          <div><img className='h-10 w-auto' src={g16} alt="" /></div>
          <div><h1 className='font-bold'>Smart Crop</h1></div>
        </div>

        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="hover:text-green-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-green-300">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;