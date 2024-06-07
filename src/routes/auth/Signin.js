import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    setError(""); // Reset error state before starting
    const result = await signIn(emailAddress, password);
    if (result.success) {
      navigate('/'); // Navigate to home page upon successful login
    } else {
      setError(result.message); // Set error message received from the server
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-md">
        <h1 className="text-lg font-bold text-center">Sign In</h1>
        <input
          type="email"
          value={emailAddress}
          placeholder="Email"
          onChange={(e) => setEmailAddress(e.target.value)}
          className="border-b border-gray-500 py-2 text-base text-black mt-5"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-gray-500 py-2 text-base text-black mt-5"
        />
        {error !== "" && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
        <button onClick={onSignInPress} className="bg-teal-800 text-white font-bold py-3 mt-5 w-full rounded-full">Sign In</button>
        <p className="text-xs text-center mt-2">Don't have an account? <Link to='/signup' className="text-black font-bold">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Signin;
