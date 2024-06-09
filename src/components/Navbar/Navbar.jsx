import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import CsdLogo from './csdv2Logo.svg';
import { GoldCoin } from '../../assets/data/Imagedata';
import LiveGoldPrice from '../../components/Tools/LiveGoldPrice';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMenu, setIsDropdownOpenMenu] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownMenu = () => {
    setIsDropdownOpenMenu(!isDropdownOpenMenu);
  };

  return (
    <nav>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />

      <div className="bg-white fixed w-full top-0 z-50 drop-shadow-lg">
        <div className="px-10 py-3 flex justify-between items-center text-black">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={CsdLogo} alt="csdlogo" width={150} height={150} className="cursor-pointer" />
            </Link>
          </div>

          {/* User and Auth */}
          <div className="flex items-center space-x-2 relative text-sm">
            <LiveGoldPrice />
            {user ? (
              <>
                <img src={GoldCoin} alt="Indiarupeesprofile" width={20} height={20} className="cursor-pointer" />
                <span className="text-black cursor-pointer" onClick={toggleDropdown}>
                  {user.name}
                </span>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded shadow-lg">
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
              <Link to="/signin" className="text-black border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white py-1 sm:px-3 px-6 text-sm rounded-lg">
                LogIn
              </Link>
            )}
            <button
              onClick={toggleDropdownMenu}
              className="text-black py-1 px-3 rounded-lg"
            >
              <i className="mdi mdi-menu mdi-24px"></i>
            </button>
            {isDropdownOpenMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                <Link to="/MarketPlace" className="block text-black hover:text-yellow-500 py-1 px-3">
                  Market
                </Link>

                <Link to="/contactus" className="block text-black hover:text-yellow-500 py-1 px-3">
                  How It Works?
                </Link>

                <Link to="/aboutus" className="block text-black hover:text-yellow-500 py-1 px-3">
                  FAQs
                </Link>

                <Link to="/aboutus" className="block text-black hover:text-yellow-500 py-1 px-3">
                  About
                </Link>

                <Link to="/contactus" className="block text-black hover:text-yellow-500 py-1 px-3">
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 w-full bg-white z-10">
        <div className="flex justify-center">
          <div className="flex flex-row justify-around w-full max-w-md p-2">
            {/* Item #1 */}
            <div className="flex flex-col items-center group">
              <Link to="/contactus" className="text-black hover:text-yellow-500 flex flex-col items-center">
                <i className="mdi mdi-phone-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                <span className="text-xs">Contact</span>
              </Link>
            </div>

            {/* Item #2 */}
            <div className="flex flex-col items-center group">
              <Link to="/MarketPlace" className="text-black hover:text-yellow-500 flex flex-col items-center">
                <i className="mdi mdi-basket-plus-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                <span className="text-xs">Market</span>
              </Link>
            </div>

            {/* Item #3 */}
            <div className="flex flex-col items-center group">
              <Link to="/" className="text-black hover:text-yellow-500 flex flex-col items-center">
                <i className="mdi mdi-home-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                <span className="text-xs">Home</span>
              </Link>
            </div>

            {/* Item #4 */}
            <div className="flex flex-col items-center group">
              <Link to="/aboutus" className="text-black hover:text-yellow-500 flex flex-col items-center">
                <i className="mdi mdi-compass-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                <span className="text-xs">About</span>
              </Link>
            </div>

            {/* Item #5 (Conditional) */}
            {user ? (
              <div className="flex flex-col items-center group">
                <Link to="/dashboard" className="text-black hover:text-yellow-500 flex flex-col items-center">
                  <i className="mdi mdi-account-circle-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                  <span className="text-xs">Account</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center group">
                <Link to="/signup" className="text-black hover:text-yellow-500 flex flex-col items-center">
                  <i className="mdi mdi-account-circle-outline mdi-24px text-black group-hover:text-yellow-500 transition-color duration-200" />
                  <span className="text-xs">Signup</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
