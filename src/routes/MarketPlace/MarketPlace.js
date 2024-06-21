// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoldBar, Guarantee, SilverCoin, GoldCoin,MarketPlacebg } from '../../assets/data/Imagedata';
import { Link } from 'react-router-dom';

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '15%', // This will make the next slide slightly visible
  };

  const slidesData = [
    { Text: "QUICK BUY", description: "Save in 24K Gold, 10₹.", url: '/MarketPlace/gold-buying', imgSrc: GoldCoin, bgGradient: "linear-gradient(to right, #facc15 ,#ca8a04)" },
    { Text: "DAILY SAVE", description: "Automate your daily gold buying.", url: '/MarketPlace/gold-buying-daily', imgSrc: SilverCoin, bgGradient: "linear-gradient(to right, #0ea5e9, #0369a1)" },
    { Text: "PLAN WEEKLY", description: "Save in 24K Gold, 10₹.", url: '/MarketPlace/gold-buying-weekly', imgSrc: GoldCoin, bgGradient: "linear-gradient(to right, #f97316, #c2410c)" },
    { Text: "PLAN MONTHLY", description: "Invest Monthly", url: '/MarketPlace/gold-buying-monthly', imgSrc: SilverCoin, bgGradient: "linear-gradient(to  right, #84552b, #341705)" },
    // Add more slides as needed
  ];

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden {bg-gradient-to-r from-yellow-950 via-red-800 to-yellow-950 }"  style={{
      backgroundImage:
      `url("${MarketPlacebg}")`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }}>

    

      <section className="w-full" >

      <section className='mx-auto text-center'>
        <h2 className="text-3xl font-bold text-white mb-">Explore Our Top Features</h2>
        <p className="text-white text-xs mb-8 ">Save to watch your wealth grow. Start saving gold for 10₹.</p>
      </section>

        <Slider {...settings}>
          {slidesData.map((slide, index) => (
            <div key={index} className="p-2">
              <img src={slide.imgSrc} alt="Item" className="rounded-t-lg w-28 mx-auto h-auto -mb-5  drop-shadow-xl" />
              <div style={{ background: slide.bgGradient }} className="rounded-lg shadow-md p-4">
                <div className="text-center mt-4">
                  <div className="text-white font-bold text-xl mt-2">{slide.Text}</div>
                  <div className="text-white text-sm">{slide.description}</div>
                  <Link to={slide.url}>
                    <button className="bg-white border-black px-10 rounded-lg hover:bg-black hover:text-white py-2 text-black mt-4">
                      Save Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <img src={Guarantee} alt="Item" className="rounded-t-lg w-[70%]  mx-auto h-auto pt-10 drop-shadow-xl" />
        <p id="copyright" className="text-center pt-1 text-[10px] text-black">
            <span className="font-bold ">© Batchu Gold</span> <br />(CopyRightsReserved)
          </p>

      </section>

      

      
    </section>
  );
};

export default ImageSlider;
