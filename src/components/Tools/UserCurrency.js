import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/GlobalProvider";
import { USER_CURRENCY_ANTS } from "../../hooks/APIHooks";
import { Ant } from "../../assets/data/Imagedata";
import { useLocation } from "react-router-dom";

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
      <div className="flex bg-yellow-500 w-24 h-14 rounded-l-full">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={Ant}
            alt="ant"
            className="w-10 h-auto mx-auto m-2 bg-white rounded-full p-2"
          />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <p className="text-center h-full text-[10px]">Loading...</p>
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex bg-yellow-500 w-28 h-14 rounded-l-full drop-shadow-xl shadow-xl">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={Ant}
          alt="ant"
          className="w-10 h-auto mx-auto m-2 bg-white rounded-full p-2"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div>
          {currency ? (
            <div>
              <p className="text-center h-full font-bold">{currency.ants}</p>
              <p className="text-center h-full text-[10px]">Total Ants</p>
            </div>
          ) : (
            <p className="text-center h-full text-[10px]">0 Earn</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCurrency;
