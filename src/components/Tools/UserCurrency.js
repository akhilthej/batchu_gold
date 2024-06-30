import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/GlobalProvider";
import { USER_CURRENCY_ANTS } from "../../hooks/APIHooks";
import { useLocation } from "react-router-dom";

import { Ant } from "../../assets/data/Imagedata";
const UserCurrency = () => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchCurrency = async (email) => {
    try {
      const response = await axios.get(
        `${USER_CURRENCY_ANTS}?emailaddress=${email}`
      );
      setCurrency(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.emailaddress) return;
    setLoading(true);
    fetchCurrency(user.emailaddress);
  }, [user, location]);

  if (loading)
    return (
      <div className="neumorphic-container flex items-center w-32 h-16 rounded-l-full">
      <div className="relative w-full h-full flex items-center justify-end">
        <img
          src={Ant}
          alt="ant"
          className="absolute w-full h-full object-cover rounded-l-full"
        />
        <div className="relative z-10 text-center">
        <p className="text-[10px] text-white pr-2">Start </p>
        <p className="text-[10px] text-white pr-2">Earning </p>
        </div>
      </div>
    </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="neumorphic-container flex items-center w-32 h-16 rounded-l-full">
      <div className="relative w-full h-full flex items-center justify-end">
        <img
          src={Ant}
          alt="ant"
          className="absolute w-full h-full object-cover rounded-l-full"
        />
        <div className="relative z-10 text-right">
          {currency ? (
            <div className="  text-center pr-1">
              <p className="text-white font-bold">{currency.ants}</p>
              <p className="text-[10px] text-white ">Total Ants</p>
            </div>
          ) : (
            <p className="text-[10px] text-white">0 Earn</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCurrency;
