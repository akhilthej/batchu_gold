import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import { GoldBar } from '../../assets/data/Imagedata';

function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const handlePaymentHistory = () => {
    navigate('/paymenthistory');
  };

  const handleBuySilver = () => {
    navigate('/silver-buying');
  };

  return (
    <section className="pt-20 px-4 sm:px-10 sm:pt-20">

      {/* User and Auth */}
      <section>
        <div className="min-w-full flex flex-col items-center justify-center bg-yellow-500 rounded-2xl p-6 text-white">
          {user ? (
            <>
              <div className="flex flex-col items-center space-y-2">
                <img src={GoldBar} alt="GoldBar profile" width={50} height={50} className="rounded-full" />
                <span className="font-bold text-lg">Hello, {user.name}</span>
                <span className="text-sm">{user.emailaddress}</span>
                <span className="text-sm">{user.sex}</span>
                <span className="text-sm">{user.phonenumber}</span>
              </div>
            </>
          ) : (
            <span className="text-black">Welcome Guest</span>
          )}
        </div>
      </section>

      {/* Dashboard Actions */}
      <div className="flex flex-col items-center justify-center bg-gray-100 py-6">
        <div className="w-full max-w-md grid grid-cols-1 gap-4">
          <button
            onClick={handlePaymentHistory}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Edit Profile
          </button>

          <button
            onClick={handlePaymentHistory}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Payment History
          </button>

          <button
            onClick={handleBuySilver}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Market Place
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

    </section>
  );
}

export default Dashboard;
