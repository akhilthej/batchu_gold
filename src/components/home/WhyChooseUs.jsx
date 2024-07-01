import React from 'react';
import { FaCertificate, FaMobileAlt, FaDollarSign, FaLock, FaSyncAlt, FaRupeeSign } from 'react-icons/fa';

const benefits = [
  {
    title: 'Guaranteed 24K Gold',
    description: 'Unlike local vendors, with SafeGold, you directly buy from the manufacturer',
    icon: <FaCertificate className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Sell anytime from home',
    description: 'Sell anytime, without going anywhere and receive money direct in your account.',
    icon: <FaMobileAlt className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Earn income on gold',
    description: 'You can lend digital gold to SafeGold-verified borrowers and earn monthly rental income in the form of gold.',
    icon: <FaDollarSign className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Safety guaranteed',
    description: 'Unlike physical gold, you don’t have to worry about theft or expensive locker fees. Your gold is stored in bank-grade lockers free of cost.',
    icon: <FaLock className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Convert to physical gold',
    description: 'You can convert your digital gold to physical gold anytime in the form of coins or jewellery through our partners.',
    icon: <FaSyncAlt className="text-4xl text-yellow-500" />,
  },
  {
    title: 'Buy as low as ₹10',
    description: 'Digital does not require to invest a large sum of money. You can invest based on your budget.',
    icon: <FaRupeeSign className="text-4xl text-yellow-500" />,
  },
];

const Benefits = () => {
  return (
    <section className="px-4 sm:px-6 bg-gray-50">
      <div className="flex flex-col items-center pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2 text-center w-full mx-auto">
            <p className="text-black font-bold">How it works?</p>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-yellow-500">
              Why choose <span className="text-orange-500">us?</span>
            </h2>
            <p className="text-black">
              With the Jar app, you can participate in the tradition of saving in 24 Karat gold at 99.5% purity, and build wealth and security for you and your family.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 grid gap-2  grid-cols-2 sm:grid-cols-3 ">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">{benefit.title}</h3>
            <p className="mt-2 text-center text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
