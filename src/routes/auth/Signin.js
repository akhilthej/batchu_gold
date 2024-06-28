import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import { MarketPlacebg } from '../../assets/data/Imagedata';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    setError("");
    const result = await signIn(emailAddress, password);
    if (result.success) {
      navigate('/MarketPlace');
    } else {
      setError(result.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-950 via-red-800 to-yellow-950" style={{
      backgroundImage: `url("${MarketPlacebg}")`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }}>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-8 m-20 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Start Saving Gold</h1>
          <h2 className="text-xl font-bold text-center mb-6">Log in</h2>
          <input
            type="email"
            value={emailAddress}
            placeholder="Email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className="border-b border-gray-300 py-2 text-base text-black mb-4 w-full px-2 rounded-xl"
          />
          <div className="relative mb-6 w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-gray-300 py-2 text-base text-black w-full px-2 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-2 "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}
          <p className="text-xs text-center m-4">✓ Please Read the following <span className="text-yellow-500 cursor-pointer" onClick={() => navigate('/termsconditions')}>Terms & Conditions</span></p>

          <button onClick={onSignInPress} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 mb-6 w-full rounded-full">Log in</button>
          <p className="text-sm text-center">Don't have an account? <Link to='/signup' className="text-black font-bold">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Signin;
