import React, { useState } from 'react';
import { useAuth } from "../../hooks/GlobalProvider";
import { Link } from "react-router-dom";
import { Godjar_home_video,UPI ,Godjar_home} from "../../assets/data/Imagedata";

import GoldInvestmentCalculator from '../../components/Calculator/GoldInvestmentCalculator.js'
import WhyChooseUs from '../../components/home/WhyChooseUs.jsx'

const Home = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Daily Savings');



  const tabs = [
    { name: 'Daily Savings', image: Godjar_home },
    { name: 'Save via Round offs', image: UPI },
    { name: 'Save via Manual savings', image: Godjar_home },
  ];

  return (
    <section className="sm:pt-20 pt-20 px-2">
      {/* User and Auth */}
      <section className="text-center z-10">
        <div>
          {user ? (
            <span className="text-black font-bold cursor-pointer text-6xl">
              Hello,{" "}
              <span className="text-black cursor-pointer font-bold text-2xl">
                {user.name}
              </span>
            </span>
          ) : (
            <>
              <span className="text-yellow-500 font-bold cursor-pointer text-6xl">Welcome </span>
            </>
          )}
        </div>
      </section>

      {/* Saving Gold */}
      <section>
        <div className="container flex flex-col py-10 mx-auto lg:flex-row lg:items-center px-4">
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-bold tracking-wide text-black lg:text-5xl">
                Saving <spam className="text-yellow-500">Gold</spam> is now easy
                !!!
              </h1>
              <div className="mt-8 space-y-5">
                <p className="flex items-center -mx-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mx-2">100% Safe Transation</span>
                </p>
                <p className="flex items-center -mx-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mx-2">Gold Delivery to your Door Steps</span>
                </p>
                <p className="flex items-center -mx-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mx-2">
                    Anyone can buy, starting as low as ₹10
                  </p>
                </p>
                <p className="text-sm flex">
                  Powered by  <img
              src={UPI}
              alt="Gold"
              className="w-[50px] h-auto ml-2"
            />{" "}
                </p>
                <Link to="/MarketPlace">
                  <button className="drop-shadow-xl bg-yellow-500 text-white text-2xl px-10 py-2 rounded-xl mt-5 hover:bg-orange-500">
                    Start Saving
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '24rem',zIndex:-5}}>
  <video
    src={Godjar_home_video}  // Ensure this path points to your .mp4 file
    style={{ width: '500px', height: 'auto', marginBottom: '0.5rem'}}
    autoPlay
    muted
    loop
    playsInline
  />
</div>


        </div>
      </section>

{/* Digital Gold */}
<section>
  <div className=" flex flex-col cursor-default section relative pt-10 pb-8 md:pt-16 md:pb-10 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl">
    <div className=" flex flex-col items-center mx-auto ">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2 px-4 text-center w-12/12 mx-auto">
          <h2 className="md:text-6xl text-4xl font-extrabold leading-tight text-white">
          What is Digital <spam className="text-white">gold?</spam>
          </h2>
          <p className=" text-white">
          It is a form of investment where gold is purchased and stored in a digital format. Investors own the gold but do not take physical possession of it. Instead, the gold is securely stored by the service provider.
          </p>
        </div>
       
      </div>
    </div>
  </div>
  
</section>


{/* Why choose us? */}
<WhyChooseUs />


{/* Tab */}
<div className="flex h-screen bg-yellow-500 text-white rounded-2xl">
      <div className="w-1/3 md:p-5 p-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
            className={`cursor-pointer p-4 my-2 rounded ${selectedTab === tab.name ? 'bg-orange-600' : 'bg-orange-800 '}`}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="w-2/3 flex items-center justify-center">
        <img src={tabs.find(tab => tab.name === selectedTab).image} alt={selectedTab} className="max-w-full max-h-full" />
      </div>
    </div>






{/* How it works */}
<section>
  <div className=" flex flex-col cursor-default section relative pt-10 pb-8 md:pt-16 md:pb-10 ">
    <div className=" flex flex-col items-center mx-auto ">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2 px-6 text-center w-10/12 mx-auto">
        <p className=" text-black font-bold">
        How it works?
          </p>
          <h2 className="text-6xl font-extrabold leading-tight text-yellow-500">
          Why choose <spam className="text-orange-500">us?</spam>
          </h2>
          <p className=" text-black">
          With the Gold Jar app, you can participate in the tradition of saving in   24 Karat gold at 99.9% purity, and build wealth and security for you and your family.
          </p>
        </div>
       
      </div>
    </div>
  </div>
  
</section>





<GoldInvestmentCalculator/>

      {/* FAQ */}
      <section>
        <div>
          <section class="text-white">
            <div class="container px-5 py-24 mx-auto">
              <div class="text-center mb-10">
                <h2 class="sm:text-3xl text-2xl text-center font-bold text-black mb-4">
                All your <spam className="text-yellow-500">Questions & Answers.</spam>
                </h2>
                <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black">
                  The most common questions about how our business works and
                  what can do for you.
                </p>
              </div>
              <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                <div class="w-full lg:w-1/2 px-4 py-2">
                  <details class="mb-4">
                    <summary class="font-semibold  bg-yellow-500  rounded-md py-2 px-4">
                      How Long is this site live?
                    </summary>

                    <span className="text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                  <details class="mb-4">
                    <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                      Can I install/upload anything I want on there?
                    </summary>

                    <span className="text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                  <details class="mb-4">
                    <summary class="font-semibold  bg-yellow-500 rounded-md py-2 px-4">
                      How can I migrate to another site?
                    </summary>

                    <span className="text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                </div>
                <div class="w-full lg:w-1/2 px-4 py-2">
                  <details class="mb-4">
                    <summary class="font-semibold  bg-orange-500 rounded-md py-2 px-4">
                      Can I change the domain you give me?
                    </summary>

                    <span class="px-4 py-2 text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                  <details class="mb-4">
                    <summary class="font-semibold  bg-orange-500 rounded-md py-2 px-4">
                      How many sites I can create at once?
                    </summary>

                    <span class="px-4 py-2 text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                  <details class="mb-4">
                    <summary class="font-semibold  bg-orange-500 rounded-md py-2 px-4">
                      How can I communicate with you?
                    </summary>

                    <span class="px-4 py-2 text-black">
                      Laboris qui labore cillum culpa in sunt quis sint veniam.
                      Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                      minim velit nostrud pariatur culpa magna in aute.
                    </span>
                  </details>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>



      
    </section>
  );
};

export default Home;
