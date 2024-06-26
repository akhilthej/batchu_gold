import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/GlobalProvider";
import LiveGoldPrice from "../../components/Tools/LiveGoldPrice";
import UserCurrency from "../../components/Tools/UserCurrency";
import { TheGoldJar1080p, TheGoldJartitle } from "../../assets/data/Imagedata";
import BottomNavbar from "./BottomNavbar";

const Navbar = () => {
  const location = useLocation();

  const isVisible =
    !["/Store/cart", "/Store/checkout", "/Store", "/Store/referralstore"].includes(location.pathname);

  const isStoreRoute = location.pathname.startsWith("/Store");

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDocumentsDropdownOpen, setIsDocumentsDropdownOpen] = useState(false);

  // Function to close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle dropdown for user menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle documents dropdown
  const toggleDocumentsDropdown = () => {
    setIsDocumentsDropdownOpen(!isDocumentsDropdownOpen);
  };

  // Effect to add click event listener to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest(".sidebar")) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <nav>
      <div className="bg-white fixed w-full top-0 z-50 drop-shadow-lg md:px-10 px-2 py-2 flex justify-between items-center text-black">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-black py-1 px-3 rounded-lg"
          >
            <i className="mdi mdi-menu mdi-24px"></i>
          </button>
          <Link to="/" className="flex items-center px-2">
            <img
              src={TheGoldJar1080p}
              alt="csdlogo"
              className="cursor-pointer w-12 h-auto "
            />
            <img
              src={TheGoldJartitle}
              alt="csdlogo"
              className="cursor-pointer w-36 h-auto pl-2 hidden md:block "
            />
          </Link>
        </div>

        <div className="flex items-center relative">
          <LiveGoldPrice />
          {isStoreRoute && (
            <Link to="/Store/cart">
              <button className="text-black py-1 px-3 rounded-lg">
                <i className="mdi mdi-cart mdi-24px"></i>
              </button>
            </Link>
          )}
        </div>
      </div>


      <section>
      {/* Your other components and content */}
      {isVisible && (
        <div className="fixed right-0 bottom-24 z-10">
          <UserCurrency />
        </div>
      )}
    </section>
    


      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#f7f7f7] shadow-lg transform transition-transform sidebar ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
            <Link
              to="/MarketPlace"
              onClick={closeSidebar}
              className="block text-black hover:text-yellow-500 py-1 px-3"
            >
              <i className="mdi mdi-gold mdi-24px mr-2"></i>
              Market
            </Link>
            <Link
              to="/Store"
              onClick={closeSidebar}
              className="block text-black hover:text-yellow-500 py-1 px-3"
            >
              <i className="mdi mdi-storefront-outline mdi-24px mr-2"></i>
              Store
            </Link>
            <Link
              to="/contactus"
              onClick={closeSidebar}
              className="block text-black hover:text-yellow-500 py-1 px-3"
            >
              <i className="mdi mdi-information-outline mdi-24px mr-2"></i>
              How It Works?
            </Link>
            <Link
              to="/aboutus"
              onClick={closeSidebar}
              className="block text-black hover:text-yellow-500 py-1 px-3"
            >
              <i className="mdi mdi-frequently-asked-questions mdi-24px mr-2"></i>
              FAQs
            </Link>
            <div className="relative">
              <div
                onClick={toggleDocumentsDropdown}
                className="text-black hover:text-yellow-500 py-1 px-3 cursor-pointer flex items-center"
              >
                <i className="mdi mdi-folder-outline mdi-24px mr-2"></i>
                Legal
                <i
                  className={`mdi mdi-chevron-down mdi-24px ml-auto ${
                    isDocumentsDropdownOpen ? "rotate-180" : ""
                  } transition-transform`}
                ></i>
              </div>
              {isDocumentsDropdownOpen && (
                <div className="bg-white shadow-md absolute left-0 right-0 top-full mt-2">
                  <Link
                    to="/privacypolicy"
                    onClick={closeSidebar}
                    className="block text-black hover:text-yellow-500 py-1 px-3"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/termsconditions"
                    onClick={closeSidebar}
                    className="block text-black hover:text-yellow-500 py-1 px-3"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/returnpolicy"
                    onClick={closeSidebar}
                    className="block text-black hover:text-yellow-500 py-1 px-3"
                  >
                    Cancellation & Refund
                  </Link>
                  <Link
                    to="/disclaimer"
                    onClick={closeSidebar}
                    className="block text-black hover:text-yellow-500 py-1 px-3"
                  >
                    Disclaimer
                  </Link>
                  <Link
                    to="/shippingdelivery"
                    onClick={closeSidebar}
                    className="block text-black hover:text-yellow-500 py-1 px-3"
                  >
                    Shipping & Delivery
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/contactus"
              onClick={closeSidebar}
              className="block text-black hover:text-yellow-500 py-1 px-3"
            >
              <i className="mdi mdi-phone-outline mdi-24px mr-2"></i>
              Contact
            </Link>
            {user ? (
              <>
                <div className="block text-black hover:text-yellow-500 py-1 px-3">
                  <span
                    className="block text-black hover:text-yellow-500"
                    onClick={toggleDropdown}
                  >
                    <i className="mdi mdi-account-circle-outline mdi-24px mr-2"></i>
                    Hi, {user.name}
                  </span>
                </div>
                <Link
                  to="/user/dashboard"
                  onClick={closeSidebar}
                  className="block text-black hover:text-yellow-500 py-1 px-3"
                >
                  <i className="mdi mdi-view-dashboard-outline mdi-24px mr-2"></i>
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-black hover:text-yellow-500 py-1 px-3"
                >
                  <i className="mdi mdi-logout mdi-24px mr-2"></i>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={closeSidebar}
                className="block text-black hover:text-yellow-500 py-1 px-3"
              >
                <i className="mdi mdi-login mdi-24px mr-2"></i>
                LogIn
              </Link>
            )}
          </div>
          <Link to="/" className="flex items-center justify-center">
            <img
              src={TheGoldJar1080p}
              alt="csdlogo"
              className="cursor-pointer w-8 h-8 sm:w-24 sm:h-24"
            />
          </Link>
          <p id="copyright" className="text-center text-xs text-black">
            <span className="font-bold">© Batchu Gold</span> <br />
            (CopyRightsReserved)
            <br />
            <span className="text-[10px]">
              Web Development & Designer Community
              <br />
            </span>
            <a
              href="http://www.cyberspacedigital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-yellow-500"
            >
              www.cyberspacedigital.in
            </a>
          </p>
        </div>
      </div>

      <BottomNavbar />
    </nav>
  );
};

export default Navbar;
