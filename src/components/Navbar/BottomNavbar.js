import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/GlobalProvider";

function BottomNavbar() {
  const location = useLocation();
  const [circlePos, setCirclePos] = useState({ left: 0 });
  const navRef = useRef();

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      const activeLink = navElement.querySelector(".active");
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        setCirclePos({ left: rect.left - navRect.left + rect.width / 2 - 20 });
      }
    }
  }, [location.pathname]);
  

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "active text-white"
      : "text-black group-hover:text-yellow-500";
  };

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  // Determine if the navbar should be visible
  const isVisible =
    ["/Store", "/contactus", "/MarketPlace", "/", "/aboutus", "/user/dashboard"].includes(location.pathname);

  if (!isVisible) {
    return null; // Return null if the navbar should not be visible
  }

  return (
    <nav className="fixed bottom-0 mb-2 w-full z-10 drop-shadow-2xl">
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />
      <div className="flex justify-center relative">
        <div
          ref={navRef}
          className="flex flex-row justify-around w-full max-w-md p-2 bg-white mx-2 rounded-full relative z-10"
        >
          

          {/* Your navigation items here */}
          {/* Item #1 */}
          <div className="flex flex-col items-center group">
            <Link
              to="/Store"
              className={`flex flex-col items-center px-4 rounded-full ${getLinkClasses(
                "/Store"
              )}`}
            >
              <i
                className={`mdi mdi-basket-plus-outline mdi-24px ${
                  location.pathname === "/Store"
                    ? "text-yellow-500 z-10 mdi-38px"
                    : "text-black transition-color z-10"
                }`}
              />
              <span className="text-[10px] text-black">Store</span>
            </Link>
          </div>

          {/* Item #2 */}
          <div className="flex flex-col items-center group">
            <Link
              to="/MarketPlace"
              className={`flex flex-col items-center px-4 rounded-full ${getLinkClasses(
                "/MarketPlace"
              )}`}
            >
              <i
                className={`mdi mdi-gold mdi-24px ${
                  location.pathname === "/MarketPlace"
                    ? "text-yellow-500 z-10"
                    : "text-black transition-color z-10"
                }`}
              />
              <span className="text-[10px] text-black">Market</span>
            </Link>
          </div>

          {/* Item #3 */}
          <div className="flex flex-col items-center group">
            <Link
              to="/"
              className={`flex flex-col items-center px-4 rounded-full ${getLinkClasses(
                "/"
              )}`}
            >
              <i
                className={`mdi mdi-home-outline mdi-24px ${
                  location.pathname === "/"
                    ? "text-yellow-500 z-10"
                    : "text-black transition-color z-10"
                }`}
              />
              <span className="text-[10px] text-black">Home</span>
            </Link>
          </div>

          {/* Item #4 */}
          <div className="flex flex-col items-center group">
            <Link
              to="/aboutus"
              className={`flex flex-col items-center px-4 rounded-full ${getLinkClasses(
                "/aboutus"
              )}`}
            >
              <i
                className={`mdi mdi-compass-outline mdi-24px ${
                  location.pathname === "/aboutus"
                    ? "text-yellow-500 z-10"
                    : "text-black transition-color z-10"
                }`}
              />
              <span className="text-[10px] text-black">About</span>
            </Link>
          </div>

          {/* Item #5 (Conditional) */}
          {user ? (
            <div className="flex flex-col items-center group">
              <Link
                to="/user/dashboard"
                className={`flex flex-col items-center px-4 rounded-full ${getLinkClasses(
                  "/user/dashboard"
                )}`}
              >
                <i
                  className={`mdi mdi-account-circle-outline mdi-24px ${
                    location.pathname === "/user/dashboard"
                      ? "text-yellow-500 z-10"
                      : "text-black transition-color z-10"
                  }`}
                />
                <span className="text-[10px] text-black">Account</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center group">
              <Link
                to="/signup"
                className={`flex flex-col items-center px-5 rounded-full ${getLinkClasses(
                  "/signup"
                )}`}
              >
                <i
                  className={`mdi mdi-account-circle-outline mdi-24px ${
                    location.pathname === "/signup"
                      ? "text-yellow-500 z-10"
                      : "text-black transition-color z-10"
                  }`}
                />
                <span className="text-[10px] text-black">Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BottomNavbar;
