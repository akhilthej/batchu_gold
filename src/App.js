import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar, PrivacyPolicy, TermsnConditions, Disclaimer, ShippingandDelivery, ReturnPolicy, Error404, 
        Home, Aboutus, Contactus, ProfileEdit,
        
        MarketPlace,GoldBuyingDaily, GoldBuying,GoldBuyingWeekly,GoldBuyingMonthly } from './routes/Routes';

import Store from './routes/Store/Store';
import GoldCoins from "./routes/Store/GoldCoins";
import Cart from './routes/Store/Cart';
import Checkout from './routes/Store/Checkout'
import ReferralStore from './routes/Store/ReferralStore'


import Signin from './routes/auth/Signin';
import Register from './routes/auth/register';
import { useAuth } from './hooks/GlobalProvider';
import Dashboard from "./routes/user/Dashboard";
import PaymentHistory from './routes/user/PaymentHistory';
import StoreHistory from './routes/user/StoreHistory';
import ReferralStoreHistory from './routes/user/ReferralHistory'
import ProductPost from "./routes/Admin/ProductsPost";

const App = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<TermsnConditions />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/shippingdelivery" element={<ShippingandDelivery />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/paymenthistory" element={<PaymentHistory />} />
        <Route path="/user/storehistory" element={<StoreHistory />} />
        <Route path="/user/referralstorehistory" element={<ReferralStoreHistory />} />
        <Route path="/user/profileedit" element={<ProfileEdit />} />
        <Route path="/Admin/ProductPost" element={user ? <ProductPost /> : <Navigate to="/signin" />} />

        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/MarketPlace/gold-buying" element={user ? <GoldBuying /> : <Navigate to="/signin" />} />
        <Route path="/MarketPlace/gold-buying-daily" element={user ? <GoldBuyingDaily /> : <Navigate to="/signin" />} />
        <Route path="/MarketPlace/gold-buying-weekly" element={user ? <GoldBuyingWeekly /> : <Navigate to="/signin" />} />
        <Route path="/MarketPlace/gold-buying-monthly" element={user ? <GoldBuyingMonthly /> : <Navigate to="/signin" />} />

        <Route path="/Store" element={<Store />} />
        <Route path="/Store/GoldCoins" element={user ? <GoldCoins /> : <Navigate to="/signin" />} />
        <Route path="/Store/cart" element={user ? <Cart /> : <Navigate to="/signin" />} />
        <Route path="/Store/checkout" element={user ? <Checkout /> : <Navigate to="/signin" />} />
        <Route path="/Store/referralstore" element={user ? <ReferralStore /> : <Navigate to="/ReferralStore" />} />



        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
