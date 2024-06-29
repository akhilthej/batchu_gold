import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoldCoinsCover } from "../../assets/data/Imagedata";
import { cover1, cover2, cover3, cover4 } from "../../assets/data/Imagedata";
import { Link } from "react-router-dom";


import { AiFillGold } from "react-icons/ai";
import { FaStoreAlt } from "react-icons/fa";
import { GiCrystalEarrings } from "react-icons/gi";

const items = [
  {
    id: 1,
    category: "Gold",
    name: "Gold Coin",
    background: GoldCoinsCover,
    url: "/Store/GoldCoins",
  },
  {
    id: 2,
    category: "Silver",
    name: "Silver Ring",
    background: GoldCoinsCover,
    url: "/Store/GoldCoins",
  },
  {
    id: 3,
    category: "Earrings",
    name: "Earrings ",
    background: GoldCoinsCover,
    url: "/Store/GoldCoins",
  },
 
];

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

  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

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
              className="rounded-lg shadow-md p-4 h-[23vh] sm:h-[40vh]"
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
        <div className="p-4">
          <h2 className="text-[25px] font-bold">Category</h2>
          <div className="flex space-x-4 mb-4 text-[15px]">
            <button
              onClick={() => setFilter("All")}
              className="flex bg-gray-300 text-black px-4 py-2 rounded-full"
            ><FaStoreAlt className="mr-3" size={23} />
              All
            </button>
            <button
              onClick={() => setFilter("Gold")}
              className="flex bg-gray-300 text-black px-4 py-2 rounded-full"
            ><AiFillGold className="mr-3" size={23} />
              Gold
            </button>
            <button
              onClick={() => setFilter("Silver")}
              className="flex bg-gray-300 text-black px-4 py-2 rounded-full"
            ><AiFillGold className="mr-3" size={23} />
              Silver
            </button>
            <button
              onClick={() => setFilter("Earrings")}
              className="flex bg-gray-300 text-black px-4 py-2 rounded-full"
            ><GiCrystalEarrings className="mr-3" size={23} />
              Earrings
            </button>
          </div>


          <p className="text-[10px] font-bold text-black leading-tight text-center mx-auto p-5">
                Introducing the exclusive Pure Gold Coin by "The Gold Jar" – a
                symbol of luxury and refinement. Crafted with precision and
                elegance, this exquisite coin exudes timeless beauty and
                sophistication. Properly packed. Elevate your collection with
                this rare and precious piece, showcasing the finest
                craftsmanship and purity of gold. Whether as a valuable
                investment or a cherished gift, experience the epitome of
                opulence with this exclusive gold coin from "The Gold Jar."
              </p>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Link to={item.url}>
              <div
  key={item.id}
  className="relative rounded-lg shadow-md h-[23vh] sm:h-[40vh]"
  style={{
    backgroundImage: `url(${item.background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute bottom-0 w-full text-center bg-opacity-50 bg-black p-2">
    <h2 className="text-[14px] font-bold text-white">{item.name}</h2>
    <p className="text-[10px] text-white font-bold">{item.category}</p>
  </div>
</div>
                
                
              </Link>
            ))}
          </div>
        </div>
        
      </section>

      
    </section>
  );
};

export default Store;
