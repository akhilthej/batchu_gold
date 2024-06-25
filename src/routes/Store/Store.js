import React from "react";
import { Link } from "react-router-dom";

import { GoldCoin } from "../../assets/data/Imagedata";
import { SilverCoin } from "../../assets/data/Imagedata";

function Store() {
  return (
    <section className="my-20">
      <div className="p-5">
        <h2 className="text-3xl font-bold text-center">Store</h2>
        <h2 className="text-[12px]  text-center">
          Click on the coin and start saving !
        </h2>
      </div>

      <div className="flex w-full  bg-white my-2">
        <div className="w-1/2  flex items-center justify-center">
          <Link to="/Store/GoldCoins">
            <img
              src={GoldCoin}
              alt="Gold"
              className="md:w-[20%] w-[50%]  h-auto  mx-auto m-2"
            />
          </Link>
        </div>

        <div className="w-1/2 bg-yellow-500 flex items-center  rounded-r-full justify-center">
         <h2 className="text-white font-bold text-[20px]">GOLD COIN</h2>
        </div>
      </div>


      <div className="flex w-full  bg-white my-2">
        <div className="w-1/2  bg-gray-300 rounded-l-full flex items-center justify-center">
        <h2 className="text-black font-bold text-[20px]">SLIVER COIN</h2>
        </div>

        <div className="w-1/2  flex items-center justify-center">
          <Link to="/Store">
            <img
              src={SilverCoin}
              alt="SilverCoin"
              className="md:w-[20%] w-[50%] h-auto mx-auto m-2"
            />
          
          </Link>
        </div>
      </div>


      <div className="flex w-full  bg-white my-2">
        <div className="w-1/2  flex items-center justify-center">
          <Link to="">
            <img
              src={GoldCoin}
              alt="Gold"
              className="md:w-[20%] w-[50%]  h-auto  mx-auto m-2"
            />
           
          </Link>
        </div>

        <div className="w-1/2 bg-pink-500 flex items-center  rounded-r-full justify-center">
        <h2 className="text-white font-bold text-[20px]">EAR RINGS</h2>
        </div>
      </div>

      
    </section>
  );
}

export default Store;
