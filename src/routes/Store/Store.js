import React from "react";
import { Link } from "react-router-dom";

import { GoldCoin,GoldCoinsCover,ReferralStoreCover } from "../../assets/data/Imagedata";

function Store() {
  return (
    <section className="my-20">
      <div className="p-5">
        <h2 className="text-3xl font-bold text-center">Store</h2>
        <h2 className="text-[12px]  text-center">
          Click on the coin and start saving !
        </h2>
      </div>

      <div className="flex w-full">
      <Link
      to="/Store/GoldCoins"
      className="w-1/2 flex items-center justify-center h-[30vh] rounded-l-3xl"
      style={{
        backgroundImage: `url("${GoldCoinsCover}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button className="w-full h-full">
        <h2 className="text-white font-bold text-center text-[20px]"> Gold Coins</h2>
      </button>
    </Link>

        <div className="w-1/2 bg-yellow-500 flex items-center justify-center p-2">
         <h2 className="text-white font-bold text-center text-[20px]">GOLD COIN
         <p className="text-[8px] font-bold text-white leading-tight text-center pt-1">Introducing the exclusive Pure Gold Coin by "The Gold Jar" – a symbol of luxury and refinement. Crafted with precision and elegance, this exquisite coin exudes timeless beauty and sophistication. Properly packed. Elevate your collection with this rare and precious piece, showcasing the finest craftsmanship and purity of gold. Whether as a valuable investment or a cherished gift, experience the epitome of opulence with this exclusive gold coin from "The Gold Jar."</p>
         </h2>
        
        </div>
      </div>





      
    </section>
  );
}

export default Store;
