// Store.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoldCoinsCover } from "../../assets/data/Imagedata";

import { cover1, cover2, cover3, cover4 } from "../../assets/data/Imagedata";
import { Link } from "react-router-dom";

const Store = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "5%", // This will make the next slide slightly visible
  };

  const slidesData = [
    {
      Text: "QUICK BUY",
      description: "Save in 24K Gold, 10₹.",
      background: cover1,
    },
    {
      Text: "DAILY SAVE",
      description: "Automate Your Savings Daily, 24 karat gold.",
      background: cover2,
    },
    {
      Text: "PLAN WEEKLY",
      description: "Automate Your Savings Weekly, 24 karat gold.",
      background: cover3,
    },
    {
      Text: "PLAN MONTHLY",
      description: "Automate Your Savings Monthly, 24 karat gold.",
      background: cover4,
    },
    // Add more slides as needed
  ];

  return (
    <section className="my-20 w-full">
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="p-2">
            <div
              className="rounded-lg shadow-md p-4 h-[23vh] sm:h-[40vh] "
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center mt-20">
                <div className="text-white font-bold text-xl mt-2">
                  {slide.Text}
                </div>
                <div className="text-white text-sm">{slide.description}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <section>
        <div className="pt-5">
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
          ></Link>

          <div className="w-1/2 bg-yellow-500 flex items-center justify-center p-2">
            <h2 className="text-white font-bold text-center text-[20px]">
              GOLD COIN
              <p className="text-[8px] font-bold text-white leading-tight text-center pt-1">
                Introducing the exclusive Pure Gold Coin by "The Gold Jar" – a
                symbol of luxury and refinement. Crafted with precision and
                elegance, this exquisite coin exudes timeless beauty and
                sophistication. Properly packed. Elevate your collection with
                this rare and precious piece, showcasing the finest
                craftsmanship and purity of gold. Whether as a valuable
                investment or a cherished gift, experience the epitome of
                opulence with this exclusive gold coin from "The Gold Jar."
              </p>
            </h2>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Store;
