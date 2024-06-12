import React from 'react';
import { Link } from 'react-router-dom';

import { GoldBar } from '../../assets/data/Imagedata';

function TopFeatures() {
  return (
    <section className="sm:py-40 py-20 px-2">
      <div className="container mx-auto text-center">
        <h2 className="text-6xl font-bold text-black mb-4">Explore Our Top Features</h2>
        <p className="text-lightblue mb-8">Save to watch your wealth grow. Withdraw quick and easy.</p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          
          <div className="bg-white p-6 rounded-xl text-black w-80 shadow-xl">
          <img src={GoldBar} alt="GoldBar" width={150} height={50}  className="mb-4 mx-auto" />

            <h3 className="text-xl font-semibold mb-2">Regular Saving</h3>
            <p className="text-lightblue mb-4">Save in 24K Gold,Start saving gold show 10₹.</p>
            <Link to='/Exchange/gold-buying'><button className="bg-white border-black px-20 border-2 hover:bg-yellow-400 py-2 rounded-full text-black">Save Now</button></Link>
          </div>

          <div className="bg-white p-6 rounded-xl text-black w-80 shadow-xl">
          <img src={GoldBar} alt="GoldBar" width={150} height={50}  className="mb-4 mx-auto" />

            <h3 className="text-xl font-semibold mb-2">Daily Save</h3>
            <p className="text-lightblue mb-4">Automate your daily gold buying.</p>
            <Link to='/Exchange/gold-buying'><button className="bg-white border-black px-20 border-2 hover:bg-yellow-400 py-2 rounded-full text-black">Save Now</button></Link>
          </div>

          <div className="bg-white p-6 rounded-xl text-black w-80 shadow-xl">
          <img src={GoldBar} alt="GoldBar" width={150} height={50}  className="mb-4 mx-auto" />

            <h3 className="text-xl font-semibold mb-2">Planned Saving</h3>
            <p className="text-lightblue mb-4">invest weekly/monthy</p>
            <Link to='/Exchange/gold-buying'><button className="bg-white border-black px-20 border-2 hover:bg-yellow-400 py-2 rounded-full text-black">Save Now</button></Link>
          </div>


        </div>
      </div>
    </section>
  );
}

export default TopFeatures;
