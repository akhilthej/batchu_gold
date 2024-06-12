import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import LiveGoldPrice from '../../components/Tools/LiveGoldPrice';
import { TheGoldJar1080p,TheGoldJartitle } from '../../assets/data/Imagedata';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDocumentsDropdownOpen, setIsDocumentsDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDocumentsDropdown = () => {
    setIsDocumentsDropdownOpen(!isDocumentsDropdownOpen);
  };

  return (
    <nav>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />

      <div className="bg-white fixed w-full top-0 z-50 drop-shadow-lg md:px-10 px-1 py-2 flex justify-between items-center text-black">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            
          <img src={TheGoldJar1080p} alt="csdlogo" width={50} height={50} className="cursor-pointer" />
            <img src={TheGoldJartitle} alt="csdlogo" width={150} height={50} className="cursor-pointer pl-2" />
          </Link>
        </div>
        

        {/* User and Auth */}
        <div className="flex items-center relative text-sm">
          <LiveGoldPrice />

          <button
            onClick={toggleSidebar}
            className="text-black py-1 px-3 rounded-lg"
          >
            <i className="mdi mdi-menu mdi-24px"></i>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={` fixed top-0 left-0 h-full bg-[#f7f7f7] shadow-lg transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <button
              onClick={toggleSidebar}
              className="text-black py-1 px-3 rounded-lg"
            >
              <i className="mdi mdi-close mdi-24px"></i>
            </button>
          </div>
          <div className="flex-grow p-4">
            {user ? (
              <>
                <div className="block text-black hover:text-yellow-500 py-1 px-3">
                  <span className="block text-black hover:text-yellow-500" onClick={toggleDropdown}>
                    <i className="mdi mdi-account-circle-outline mdi-24px mr-2"></i>
                    Hi, {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="block text-black hover:text-yellow-500 py-1 px-3"
                >
                  <i className="mdi mdi-logout mdi-24px mr-2"></i>
                  Logout
                </button>

                <Link to="/dashboard" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                  <i className="mdi mdi-view-dashboard-outline mdi-24px mr-2"></i>
                  Account
                </Link>
              </>
            ) : (
              <Link to="/signin" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                <i className="mdi mdi-login mdi-24px mr-2"></i>
                LogIn
              </Link>
            )}

            <Link to="/MarketPlace" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
              <i className="mdi mdi-storefront-outline mdi-24px mr-2"></i>
              Market
            </Link>

            <Link to="/contactus" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
              <i className="mdi mdi-information-outline mdi-24px mr-2"></i>
              How It Works?
            </Link>

            <Link to="/aboutus" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
              <i className="mdi mdi-frequently-asked-questions mdi-24px mr-2"></i>
              FAQs
            </Link>

            <Link to="/aboutus" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
              <i className="mdi mdi-information-outline mdi-24px mr-2"></i>
              About
            </Link>

            <div className="relative">
              <div
                onClick={toggleDocumentsDropdown}
                className=" text-black hover:text-yellow-500 py-1 px-3 cursor-pointer flex items-center"
              >
                <i className="mdi mdi-folder-outline mdi-24px mr-2"></i>
                Legal
                <i className={`mdi mdi-chevron-down mdi-24px ml-auto ${isDocumentsDropdownOpen ? 'rotate-180' : ''} transition-transform`}></i>
              </div>
              {isDocumentsDropdownOpen && (
                <div className="bg-white shadow-md absolute left-0 right-0 top-full mt-2">
                  <Link to="/privacypolicy" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                    Privacy Policy
                  </Link>
                  <Link to="/termsconditions" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                    Terms & Conditions
                  </Link>
                  <Link to="/returnpolicy" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                    Cancellation & Refund
                  </Link>
                  <Link to="/disclaimer" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                    Disclaimer
                  </Link>
                  <Link to="/shippingdelivery" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
                    Shipping & Delivery
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contactus" onClick={closeSidebar} className="block text-black hover:text-yellow-500 py-1 px-3">
              <i className="mdi mdi-phone-outline mdi-24px mr-2"></i>
              Contact
            </Link>
          </div>

          <Link to="/" className="flex items-center justify-center">
            <img src={TheGoldJar1080p} alt="csdlogo" width={100} height={100} className="cursor-pointer" />
          </Link>
          <p id="copyright" className="text-center text-xs text-black m-4">
            <span className="font-bold">© Batchu Gold</span> <br />(CopyRightsReserved)
            <br />
            <span className="text-[10px]">Web Development & Designer Community<br /></span>
            <a href="http://www.cyberspacedigital.in" target="_blank" rel="noopener noreferrer" className="text-black hover:text-yellow-500">
              www.cyberspacedigital.in
            </a>
          </p>
        </div>
      </div>

      <nav className="fixed bottom-0 w-full bg-white z-10 ">
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
