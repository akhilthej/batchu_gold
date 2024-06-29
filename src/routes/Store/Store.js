import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoldCoinsCover } from "../../assets/data/Imagedata";
import { cover1, cover2, cover3, cover4 } from "../../assets/data/Imagedata";
import { Link } from "react-router-dom";

import { FaStoreAlt } from "react-icons/fa";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://batchugold.com/apis/Store/ProductPost.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Filter out products with "Gold Coin" and "Silver Coin" categories
        const filteredProducts = data.filter(
          (product) =>
            product.product_catalogue !== "Gold Coin" &&
            product.product_catalogue !== "Silver Coin"
        );

        // Set products in state
        setProducts(filteredProducts);

        // Extract unique categories from filtered products
        const uniqueCategories = Array.from(
          new Set(filteredProducts.map((product) => product.product_catalogue.toLowerCase()))
        );

        // Set categories in state, including "All"
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error or show a message to the user
      }
    };

    fetchProducts();
  }, []); // Fetch products and categories only once on component mount

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

  const filteredProducts =
    filter === "All"
      ? products // Show all products except "Gold Coin" and "Silver Coin"
      : products.filter(
          (item) =>
            item.product_catalogue.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="my-20 w-full overflow-hidden">
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


{/*Coins */}
<section>
<h3 className="text-center font-bold text-3xl mt-5"> Store</h3>
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
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <Link
            to="/Store/GoldCoins"
            className="relative rounded-lg shadow-md h-[23vh] sm:h-[40vh]"
            style={{
              backgroundImage: `url("${GoldCoinsCover}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 w-full text-center bg-opacity-50 bg-black p-2">
                    <h2 className="text-[14px] font-bold text-white">
                      Gold Coins
                    </h2>
                    </div>
          </Link>

<Link
            to=""
            className="relative rounded-lg shadow-md h-[23vh] sm:h-[40vh] "
            style={{
              backgroundImage: `url("${GoldCoinsCover}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 w-full text-center bg-opacity-50 bg-black p-2">
                    <h2 className="text-[14px] font-bold text-white">
                      Silver Coins
                    </h2>
                    </div>
          </Link>

        </div>
</section>

      <section>
        <div className="p-4 overflow-hidden">
          <h2 className="text-[25px] font-bold">Category</h2>
          <div className="flex space-x-4 mb-4 text-[15px]">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setFilter(category)}
                className={`flex ${
                  filter.toLowerCase() === category.toLowerCase()
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300 text-black"
                } px-4 py-2 rounded-full`}
              >
                {category.toLowerCase() === "all" && (
                  <FaStoreAlt className="mr-3" size={23} />
                )}
                
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/Store/contactus`}>
                <div
                  className="relative rounded-lg shadow-md h-[23vh] sm:h-[40vh]"
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,${product.image_data})`,
                    
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                
                </div>
                <div className=" w-full text-center p-2">
                    <h2 className="text-[14px] font-bold text-black">
                      {product.title}
                    </h2>
                    <p className="text-[10px] text-black font-bold">
                      {product.product_catalogue}
                    </p>
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
