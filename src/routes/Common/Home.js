import React, { useState } from 'react';
import { useAuth } from "../../hooks/GlobalProvider";
import { Link } from "react-router-dom";
import { Godjar_home_video,UPI ,Godjar_home} from "../../assets/data/Imagedata";

import GoldInvestmentCalculator from '../../components/Calculator/GoldInvestmentCalculator.js'
import WhyChooseUs from '../../components/home/WhyChooseUs.jsx'

const Home = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Daily Savings');



 

  return (
    <section className="my-24 px-2">
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
                Save <spam className="text-yellow-500">Earn</spam> & Grow
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
                  <span className="mx-2">100% Referral Gift</span>
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
            Frequently Asked <span className="text-yellow-500">Questions</span>
          </h2>
          <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black">
            Find answers to the most common questions about The Gold Jar.
          </p>
        </div>
        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          <div class="w-full lg:w-1/2 px-4 py-2">
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Why The Gold Jar is the best?
              </summary>
              <span className="text-black">
                There are multiple ways to invest in virtual gold, such as Gold ETFs, sovereign bonds, gold mutual funds, and digital gold where user can only take benefit of the prices. The Gold Jar app is the one that suits users' requirements. It is the only one and first physical gold app that offers the user to buy 24 karat 99.9% gold starting from Rs 10 and user can collect it from their store or wait and get the product delivered at your location after it reaches the coin target i.e 0.200 grams.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Is The Gold Jar safe to buy?
              </summary>
              <span className="text-black">
                Yes, comparing to digital gold, The Gold Jar is very safe to buy. The gold comes with 99.9% purity, and hence user need not worry about the genuineness and purity. Batchu Gold and The Gold Jar do not store more than 1 gram gold in their safe vault. For example, If the user stores gold nuggets in their wallet account and don't collect even after reaching the maximum target (1:000 gram), Batchu Gold staff will call to the user's registered mobile number and communicate with them and see that the product is sent to their delivery address. Till then, their gold is stored in a secured vault.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Is The Gold Jar profitable?
              </summary>
              <span className="text-black">
                The Gold Jar is backed by physical gold and not digital gold. Hence it gives good return to the users. Since gold is one commodity that grows in the long term, investing in The Gold Jar is profitable.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Is The Gold Jar taxable?
              </summary>
              <span className="text-black">
                Yes. 3% G.S.T are applicable on every purchase done by the user. Here, User doesn't have an option of long-term savings with The Gold Jar, so the user can enjoy the capital gains. But in digital gold apps, capital gains on gold are taxable. If user sell their digital gold in the short term (before three years), the capital gains are taxable at the income tax slab rate. Suppose user sell the digital gold in the long term (after three years), the capital gains are taxable at 20%.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Is buying gold in The Gold Jar a good investment?
              </summary>
              <span className="text-black">
                Yes. Gold acts as a perfect hedge against inflation. It is the only commodity that can help beat inflation. Moreover, it helps prevent the downside risk of a portfolio. Hence having gold in users portfolio will help boost the overall portfolio returns. Here, in The Gold Jar, user can buy gold nuggets in small quantities.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-yellow-500 rounded-md py-2 px-4">
                Is it worth buying gold in The Gold Jar?
              </summary>
              <span className="text-black">
                Yes, The Gold Jar is an excellent investment app if user is looking to invest in gold. Firstly, user has not to worry about the purity as they get 24 karat 99.9% purity gold. Second, The Gold Jar doesn't store users gold for a long term in the secured vault and they see that the product is delivered to the user. Third, The Gold Jar is offering many benefits to the user. User can earn a passive income through this app. User also gets surprise gifts for every purchase. Fourth, user can purchase 22 karat 91.6% B.I.S hallmarked jewellery at their store or their partner store in exchange of The Gold Jar 24 karat 99.9% gold coins without paying any making or wastage or value-added charges (for specific categorized designs). Fifth, in saving schemes, after doing the payment to The Gold Jar, the user gets the gold delivered to their address and the user has to decide what to do with the gold. Sixth, with The Gold Jar, user can buy gold and save it, earn ants through referrals, grow with The Gold Jar. In short: BUY, EARN AND GROW. Overall, gold is a perfect diversification.
              </span>
            </details>
          </div>
          <div class="w-full lg:w-1/2 px-4 py-2">
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                When to buy gold in The Gold Jar?
              </summary>
              <span className="text-black">
                Even if the price of gold peaks during certain months, the best time to buy gold is from January to December. Gold is a luck sign, user can buy it any time.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                Why The Gold Jar app is not having sell option?
              </summary>
              <span className="text-black">
                The Gold Jar is not a trade entity and doesn't encourage sell option in the app. According to the Indian culture, sentiment and psychology, The Gold Jar and Batchu Gold considers that gold is an auspicious product and everyone in India are obsessed with it. Everyone wishes to include gold in festivals and considered it as the most auspicious purchase. The Gold Jar app and the Batchu Gold has a mission to create an eco-system of saving gold which is accessible to all, helping billion people in India to grow their wealth by giving ways to public to save easily and earn smartly. Batchu Gold vision is to see every person in the country making wealth creation easy and accessible. That is the reason, there is no sell option.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                How can a user convert their gold purchase into cash in The Gold Jar?
              </summary>
              <span className="text-black">
                Gold is a go-to investment if having excess money. According to The Gold Jar and Batchu Gold, Gold is also called as a store of wealth. If the user still wants to convert gold into cash for their personal reasons, user can contact on given customer care number or send a mail to registered email ID. The Gold Jar staff will find a solution and resolve it.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                Does The Gold Jar app gold price increase or decrease?
              </summary>
              <span className="text-black">
                Yes, the price of gold is the same as bullion gold. Hence the price of gold fluctuates based on demand and supply.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                Can NRI buy gold in The Gold Jar app in India?
              </summary>
              <span className="text-black">
                Yes. But the NRI as a user has to bear the payment gateway charges, transportation charges that are expensive. Instead, the user NRI can take help of their family members, friends or relatives staying in India and purchase behalf of them.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                Can user withdraw gold from The Gold Jar?
              </summary>
              <span className="text-black">
                Yes, user can withdraw their physical gold whenever they want. If the gold is in form of nuggets (below 0:200 grams), the user has to come to Batchu Gold store and collect their gold. Some digital gold apps offer users to convert their digital gold into money whenever they want. However, they charge high for withdrawal. The Gold Jar and Batchu Gold doesn't store users' gold for long term. Hence the user has to decide what they want to do with the gold.
              </span>
            </details>
            <details class="mb-4">
              <summary class="font-semibold bg-orange-500 rounded-md py-2 px-4">
                Does The Gold Jar offer long-term saving?
              </summary>
              <span className="text-black">
                The Gold Jar offers users long term savings of 1:000 gram with easy monthly installments in gold.
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
