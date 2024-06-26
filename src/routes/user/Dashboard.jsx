import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/GlobalProvider";
import { GoldBar } from "../../assets/data/Imagedata";
import {
  FaHistory,
  FaStore,
  FaExchangeAlt,
  FaUserEdit,
  FaLifeRing,
  FaBug,
} from "react-icons/fa";

function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <section className="py-20 sm:py-24 px-5">
      <div className="flex justify-center ">
        {/* Left Column */}
        <div className="w-1/3   p-4 hidden lg:flex">
          <div className=" items-center justify-center hidden lg:block">
            <img
              src={GoldBar}
              alt="GoldBar"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Center Column */}
        <div className="lg:w-1/3 w-full">
        <div className="flex-1 flex flex-col items-center py-10 bg-white rounded-2xl shadow-2xl">
          {/* User and Auth */}
          <section>
            <div className="max-w-full flex flex-col items-center justify-center rounded-2xl p-6 text-black">
              {user ? (
                <>
                  <div className="flex flex-col items-center ">
                    <img
                      src={GoldBar}
                      alt="GoldBar profile"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <span className="font-bold text-lg">
                      Hello, {user.name}
                    </span>
                    <span className="text-sm">{user.emailaddress}</span>
                    <div className="flex-row text-center">
                      <span className="text-[10px]">{user.phonenumber}</span><br/>
                      <span className="text-[10px]">{user.address}</span>
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-black">Welcome Guest</span>
              )}
            </div>
          </section>

          {/* Dashboard Actions */}
          <div className="flex flex-col items-center justify-center w-full px-20">
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="border-t border-gray-300 " />

              <div className="text-center">
                <p className="text-xl font-medium">Transactions</p>
                <p className="text-sm">Check all your transactions</p>
              </div>

              <a href="/user/paymenthistory">
                <button className="flex items-center justify-center text-black py-2">
                  <FaHistory className="mr-3" size={23} />
                  <p className="text-[16px]">Payment History</p>
                </button>
                <span className="text-xs text-gray-600">
                  View your payment transactions and remaining balance.
                </span>
              </a>

              <a href="/user/storehistory">
                <button className="flex items-center justify-center text-black py-2">
                  <FaHistory className="mr-3" size={23} />
                  <p className="text-[16px]">Store History</p>
                </button>
                <span className="text-xs text-gray-600">
                  View your payment transactions and remaining balance.
                </span>
              </a>

              <a href="/user/referralstorehistory">
                <button className="flex items-center justify-center text-black py-2">
                  <FaHistory className="mr-3" size={23} />
                  <p className="text-[16px]">Referral Store History</p>
                </button>
                <span className="text-xs text-gray-600">
                  View your payment transactions and remaining balance.
                </span>
              </a>

              

              <div className="border-t border-gray-300 "></div>
              <div className="text-center">
                <p className="text-xl font-medium">Referral Clam</p>
                <p className="text-sm">Change to ants into gold coins.</p>
              </div>

              <Link to="/Store/referralstore">
                <button className="flex items-center justify-center text-black py-2">
                  <FaUserEdit className="mr-3" size={23} />
                  <p className="text-[16px]">Referral Store</p>
                </button>
                <span className="text-xs text-gray-600">
                  Convert you ants to mine in gold for gold coins the larger
                  ants you have the more gold you can clam.
                </span>
              </Link>

              <div className="border-t border-gray-300 "></div>
              <div className="text-center">
                <p className="text-xl font-medium">Personal</p>
                <p className="text-sm">Modify your profile</p>
              </div>

              <Link to="/user/profileedit">
                <button className="flex items-center justify-center text-black py-2">
                  <FaUserEdit className="mr-3" size={23} />
                  <p className="text-[16px]">Edit Profile</p>
                </button>
                <span className="text-xs text-gray-600">
                  Change your details. Please contact support before changing
                  your phone number or email.
                </span>
              </Link>

              <div className="border-t border-gray-300 "></div>

              <div className="text-center">
                <p className="text-xl font-medium">Help Center</p>
                <p className="text-sm">Need more help?</p>
              </div>

              <Link to="/contactus">
                <button className="flex items-center justify-center text-black py-2">
                  <FaLifeRing className="mr-3" size={23} />
                  <p className="text-[16px]">Contact Us</p>
                </button>
                <span className="text-xs text-gray-600">
                  We are here to help you 24/7.
                </span>
              </Link>

              <Link to="/contactus">
                <button className="flex items-center justify-center text-black py-2">
                  <FaBug className="mr-3" size={23} />
                  <p className="text-[16px]">Report a Bug</p>
                </button>
                <span className="text-xs text-gray-600">
                  Having issues? Let us know so we can resolve them.
                </span>
              </Link>

              {/* Admin controls */}
              {user && user.role === "admin" && (
                <div>
                  <div className="text-center">
                    <p className="text-xl font-medium">Admin Controls</p>
                    <p className="text-sm">Only Admin can access this.</p>
                  </div>

                  <Link to="/Admin/ProductPost">
                    <button className="flex items-center justify-center text-black py-2">
                      <FaStore className="mr-3" size={23} />
                      <p className="text-[16px]">Post Products</p>
                    </button>
                    <span className="text-xs text-gray-600">
                      Browse our marketplace for more ornaments and items.
                    </span>
                  </Link>
                </div>
              )}
              {/*---- end Admin controls ---*/}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 p-4 hidden lg:flex">
          <div className=" items-center justify-center hidden md:block">
            <img
              src={GoldBar}
              alt="GoldBar"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

     
    </section>
  );
}

export default Dashboard;
