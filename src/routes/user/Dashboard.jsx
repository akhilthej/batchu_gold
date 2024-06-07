import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';

import { GoldCoin } from '../../assets/data/Imagedata'

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
<section className='p-8 bg-gray-100 text-center'>

{/* User and Auth */}
<section>
<div className="min-w-full items-center justify-center bg-teal-700 rounded-2xl p-8 text-white">

{user ? (
<>
  <span className="cursor-" >

  <img src={GoldCoin} alt="GoldCoinprofile" width={50} height={50} className="cursor-default " />
   Hello, <span className=" cursor-default font-bold" >{user.name}</span> 
   <br/>
   <span className=" cursor-default font-bold" >{user.emailaddress}</span> 
   <br/>
   <span className=" cursor-default font-bold" >{user.sex}</span> 
   <br/>
   <span className=" cursor-default font-bold" >{user.phonenumber}</span> 
  </span>
</>
) : (
<>
<span className="text-black cursor-default" >
    Welcome Guest
  </span>

</>
)}
</div>
</section>


   


    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-4 gap-8">

      <button
            onClick={handlePaymentHistory}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>


          <button
            onClick={handlePaymentHistory}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Payment History
          </button>

          <button
            onClick={handleBuySilver}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Market Place
          </button>

         <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-900"
          >
            Logout
          </button>


      </div>
    </div>
    

    </section>
  )
}

export default Dashboard