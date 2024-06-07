import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar, Footer, PrivacyPolicy, TermsnConditions, Disclaimer, ShippingandDelivery, ReturnPolicy, Error404, 
        Home, Aboutus, Contactus, MarketPlace } from './routes/Routes';


import Signin from './routes/auth/Signin';
import Register from './routes/auth/register';
import { useAuth } from './hooks/GlobalProvider';

import Dashboard from "./routes/user/Dashboard";
import PaymentHistory from './routes/user/PaymentHistory'



import SilverBuying from './routes/MarketPlace/SilverBuying'
import GoldBuying from './routes/MarketPlace/GoldBuying'

const App = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
      
      <Route path="/*" element={<Home />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />

        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<TermsnConditions />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/shippingdelivery" element={<ShippingandDelivery />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/paymenthistory" element={<PaymentHistory />} />
        
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/silver-buying" element={user ? <SilverBuying /> : <Navigate to="/signin" />} />
        <Route path="/gold-buying" element={user ? <GoldBuying /> : <Navigate to="/signin" />} />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
