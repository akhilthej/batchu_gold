import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import CsdLogo from './csdv2Logo.svg';

import { GoldCoin } from '../../assets/data/Imagedata'

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
       <link
          rel="stylesheet"
          href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
        />

    <div className="bg-white fixed w-full top-0 z-50 drop-shadow-lg ">
      <div className="px-10 py-3 flex justify-between items-center text-black">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={CsdLogo} alt="csdlogo" width={150} height={150} className="cursor-pointer" />
          </Link>
        </div>

        {/* User and Auth */}
        <div className="flex items-center space-x-2 relative text-sm">

        <Link to="/MarketPlace" className="text-black hover:text-yellow-500 py-1 px-3 ">
                Market
              </Link>

              <Link to="/aboutus" className="text-black hover:text-yellow-500 py-1 px-3 ">
                About
              </Link>

              <Link to="/contactus" className="text-black hover:text-yellow-500 py-1 px-3 ">
                Contact
              </Link>

          {user ? (
            <>
            <img src={GoldCoin} alt="Indiarupeesprofile" width={20} height={20} className="cursor-pointer" />
              <span className="text-black cursor-pointer" onClick={toggleDropdown}>
                {user.name}
              </span>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
               

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                 
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/signin" className="text-black border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white py-1 sm:px-3 px-6 text-sm rounded-lg">
                LogIn
              </Link>
              
            </>
          )}
        </div>
      </div>
    </div>


    <nav>
  <>
    {/* Container */}
    <div className="flex items-center bg-white fixed bottom-0 z-10 w-full justify-center">
      <div className="flex flex-col">
          {/* Navigation Bar */}
          <div className="pt-2">
            <div className="flex flex-row space-x-5">


            {/* Item #1 */}
            <div className="flex group">
                <Link to="/contactus" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-phone-outline mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    Contact
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>

            
               {/* Item #2 */}
               <div className="flex group">
                <Link to="/MarketPlace" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-basket-plus-outline mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    Market
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>


              

               {/* Item #3 Active */}
             <div className="flex group">
                <Link to="/" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-home-outline mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    Home
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>


             

             

              {/* Item #4 */}
              <div className="flex group">
                <Link to="/aboutus" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-compass-outline  mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    About
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>

              <div className="sticky w-full top-0 z-50 drop-shadow-lg ">
      
       
        <div>
        
          {user ? (
            <>
            <div className="flex group">
                <Link to="/dashboard" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-account-circle-outline mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    Account
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>
            </>
          ) : (
            <>
            <div className="flex group">
                <Link to="/signup" className=" text-black hover:text-yellow-500 flex flex-col items-center">
                  {/* Icon */}
                  <i className="mdi mdi-account-circle-outline mdi-24px mx-1 text-black group-hover:text-yellow-500 transition-color duration-200"/>
                  {/* Text */}
                  <span className="text-xs mb-1">
                    Signup
                  </span>
                  {/* Focus Dot */}
                </Link>
              </div>
           
            </>
          )}
        </div>
      </div>
    </div>
             
            </div>
          </div>
        </div>
  </>
</nav>



    </nav>
  );
};

export default Navbar;




