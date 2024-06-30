import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/GlobalProvider";
import { GOLD_LIVE_PRICE, USER_CURRENCY_ANTS } from "../../hooks/APIHooks";

import {
  GoldCoin,
  Guarantee,
  StoreGoldCoinBG,
} from "../../assets/data/Imagedata";
import { Link, useLocation } from "react-router-dom";

import { RiStore3Fill } from "react-icons/ri";

function GoldCoins() {
  const { user } = useAuth();
  const [currency, setCurrency] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const goldpricelive = GOLD_LIVE_PRICE;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(goldpricelive);
        const data = await response.json();

        if (data && data.length > 0) {
          const goldData = data.find((item) => item.product_name === "Gold");
          if (goldData) {
            setGoldPrice(goldData.price);
          }
        }
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    };

    fetchGoldPrice();
  }, [goldpricelive]);

  const fetchCurrency = async (email) => {
    try {
      const response = await axios.get(
        `${USER_CURRENCY_ANTS}?emailaddress=${email}`
      );
      setCurrency(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://batchugold.com/apis/Store/ProductPost.php"
        );
        const data = await response.json();
        const filteredData = data.filter(
          (product) => product.product_catalogue === "Gold Coin"
        );
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const calculateTotalPrice = (product) => {
    if (!goldPrice) return "Loading...";

    const goldPricePerGram = goldPrice / 1;
    const originalProductPrice = goldPricePerGram * product.weight;

    const makingCharges =
      (product.making_percentage / 100) * originalProductPrice;
    const gst = 0.03 * (originalProductPrice + makingCharges);

    const totalPrice = originalProductPrice + makingCharges + gst;

    return `${totalPrice.toFixed(0)}`;
  };

  const buyNow = async () => {
    if (!selectedProduct) return;

    const totalPrice = calculateTotalPrice(selectedProduct);
    const totalPriceInt = parseInt(totalPrice, 10);

    if (currency && currency.ants >= totalPriceInt) {
      // Deduct points from user's account
      try {
        const deductPointsResponse = await axios.put(`${USER_CURRENCY_ANTS}`, {
          id: currency.id,
          ants: currency.ants - totalPriceInt,
          remarks: `Purchased ${selectedProduct.title}`,
        });

        if (deductPointsResponse.data.status === "success") {
          // Update local state for currency
          setCurrency((prevCurrency) => ({
            ...prevCurrency,
            ants: prevCurrency.ants - totalPriceInt,
          }));

          // Generate random number
          const randomNum = Math.floor(Math.random() * 1000000); // Adjust as needed

          // Now proceed to place the order
          try {
            const orderResponse = await axios.post(
              "https://batchugold.com/apis/Store/ReferralOrderPlace.php",
              {
                merchantTransactionId: `${user.name}-${randomNum}`,
                merchantUserId: user.emailaddress, // Assuming you have user object with id
                amount: totalPriceInt,
                merchantOrderId: user.name, // Replace with your logic for generating an order ID
                mobileNumber: user.phonenumber, // Example, replace with actual data
                message: "Order From Store | Address:" + user.address,
                email: user.emailaddress, // Assuming you have user email
                shortName: "BAT_StoreOrders", // Assuming you have user name
                orderlist: `${selectedProduct.title}`, // Example, replace with actual data
                delivery: "PROCESSING", // Example, replace with actual delivery type
                quantity: 1, // Example, replace with actual quantity
              }
            );

            if (orderResponse.data.status === "success") {
              alert("Purchase successful!");
            } else {
              alert("Purchase failed: " + orderResponse.data.message);
            }
          } catch (error) {
            alert("Error placing order: " + error.message);
          }
        } else {
          alert("Purchase failed: " + deductPointsResponse.data.message);
        }
      } catch (error) {
        alert("Error processing purchase: " + error.message);
      }
    } else {
      alert("Insufficient ants for this purchase.");
    }
  };

  useEffect(() => {
    if (!user || !user.emailaddress) return;
    setLoading(true);
    fetchCurrency(user.emailaddress);
  }, [user, location]);

  return (
    <section
      className="min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url("${StoreGoldCoinBG}")`,
        backgroundSize: "contain",
        backgroundPosition: "top",
      }}
    >
      <section className="my-20">
        <h2 className="text-[50px] text-yellow-500 font-bold text-center bg-white/80">
          GOLD COIN
        </h2>
        <p className="text-[18px] text-center font-bold text-yellow-900 bg-white/80">
          Save Earn & Grow
        </p>
        <p className="text-[16px] text-center text-yellow-900 bg-white/80">
          Get 100% Referral Commission on every purchase.
        </p>

        <div>
          <img
            src={GoldCoin}
            alt="Gold"
            className="md:w-[10%] w-[30%] h-auto mx-auto m-4"
          />
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="relative z-10 text-right">
            {currency ? (
              <div className=" text-center pb-5">
                <p className="text-[10px] text-black ">Total Ants</p>
                <p className="text-black font-bold">{currency.ants}</p>
              </div>
            ) : (
              <p className="text-[10px] text-white">0 Earn</p>
            )}
          </div>
        </div>

        <div className="px-2 mx-auto flex">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  selectedProduct && selectedProduct.id === product.id
                    ? "border-2 border-yellow-500"
                    : ""
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="p-4 text-center">
                  <h3 className="text-[18px] font-semibold ">
                    {product.title}
                  </h3>
                  <p className="text-[12px] text-gray-900 leading-tight">
                    Purity: 24 Karat (99.9)
                  </p>
                  <p className="text-[10px] font-bold text-gray-900 leading-tight mt-2">
                    Ants
                  </p>
                  <p className="text-[18px] font-bold text-gray-900 mb-2">
                    {calculateTotalPrice(product)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <div className="flex z-50 fixed w-full bottom-0 bg-white h-[80px] drop-shadow-xl">
            <div className="w-1/2 flex items-center justify-center">
              <div className="text-center">
                <Link to="/Store">
                  <div className="rounded-l-lg text-black">
                    <RiStore3Fill className="h-6 w-8 text-black mx-auto" />
                  </div>
                </Link>
                <Link to="/Store">
                  <button className="text-gray-700 text-xs">
                    BACK TO STORE
                  </button>
                </Link>
                <p className="text-xl font-bold"></p>
              </div>
            </div>

            <button
              className="w-1/2 flex items-center bg-yellow-500 hover:bg-orange-600 transition duration-300 justify-center"
              onClick={buyNow}
            >
              <div className="flex items-center justify-center text-white">
                Buy Now
              </div>
            </button>
          </div>
        )}
      </section>
    </section>
  );
}

export default GoldCoins;
