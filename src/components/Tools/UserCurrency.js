import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/GlobalProvider';
import { USER_CURRENCY_ANTS } from '../../hooks/APIHooks';

import {Ant} from '../../assets/data/Imagedata'

const UserCurrency = () => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      if (!user || !user.emailaddress) return;

      try {
        const response = await axios.get(`${USER_CURRENCY_ANTS}?emailaddress=${user.emailaddress}`);
        setCurrency(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

    <div className="flex bg-white w-24 h-14 rounded-l-full  border-2">
    <div className="w-1/2 flex items-center justify-center">
    <img
              src={Ant}
              alt="ant"
              className="w-10 h-auto mx-auto m-2 bg-gray-300 rounded-full p-2"
            />
    </div>



    <div className="w-1/2  flex items-center justify-center">
      
      <div>
        {currency ? (
          <p className='text-center h-full'>{currency.ants}</p>
        ) : (
          <p>No currency data available for this user.</p>
        )}
      </div>
    </div>

  </div>

   
  );
};

export default UserCurrency;
