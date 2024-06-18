import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar, PrivacyPolicy, TermsnConditions, Disclaimer, ShippingandDelivery, ReturnPolicy, Error404, 
        Home, Aboutus, Contactus, MarketPlace, GoldBuying, ProfileEdit } from './routes/Routes';

import Store from './routes/Store/Store';
import Cart from './routes/Store/Cart';
import Checkout from './routes/Store/Checkout'

import Signin from './routes/auth/Signin';
import Register from './routes/auth/register';
import { useAuth } from './hooks/GlobalProvider';
import Dashboard from "./routes/user/Dashboard";
import PaymentHistory from './routes/user/PaymentHistory';
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
        <Route path="/user/profileedit" element={<ProfileEdit />} />
        <Route path="/Admin/ProductPost" element={user ? <ProductPost /> : <Navigate to="/signin" />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/MarketPlace/gold-buying" element={user ? <GoldBuying /> : <Navigate to="/signin" />} />

        <Route path="/Store" element={<Store />} />
        <Route path="/Store/cart" element={user ? <Cart /> : <Navigate to="/signin" />} />
        <Route path="/Store/checkout" element={user ? <Checkout /> : <Navigate to="/signin" />} />

        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
