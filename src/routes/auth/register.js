import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {CRUD_API} from '../../hooks/APIHooks'; 

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    console.log(JSON.stringify({
      name: `${firstName} ${lastName}`,
      emailaddress: emailAddress,
      phonenumber: phoneNumber,
      sex: 'Male', // Assuming default to "Male"
      role: 'client',
      password: password,
    }));
    
    setError(""); // Reset error state before starting
    try {
      const response = await fetch(CRUD_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          emailaddress: emailAddress,
          phonenumber: phoneNumber,
          sex: 'Male', // Assuming default to "Male"
          role: 'client',
          password: password,
        })
      });

      const data = await response.json();
      console.log("Response status:", response.status); // Log response status
      console.log("Response data:", data); // Log response data for debugging

      if (response.ok) {
        if (data.status === 'success') {
          // Navigate to sign-in page upon successful signup
          navigate('/signin');
        } else {
          setError(data.message); // Set error message received from the server
        }
      } else {
        setError('Failed to sign up. Please try again.');
      }
    } catch (err) {
      console.error("Sign-up error", err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">

      <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-md">
        <h1 className="text-lg font-bold text-center">Let's Start</h1>
        <h2 className="text-xl font-bold text-center">Building your Brand</h2>
        <p className="text-xs text-gray-500 mt-2 text-center">A Knowledge place for all your Digital Needs.</p>

        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="border-b border-gray-500 py-2 text-base text-black mt-5"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="border-b border-gray-500 py-2 text-base text-black mt-5"
        />
        <input
          type="email"
          value={emailAddress}
          placeholder="Email"
          onChange={(e) => setEmailAddress(e.target.value)}
          className="border-b border-gray-500 py-2 text-base text-black mt-5"
        />
        <input
          type="tel"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
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

        <button onClick={onSignUpPress} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 mt-5 w-full rounded-full">Sign Up</button>

        <p className="text-xs text-center mt-2">✓ I accept the following <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/termsconditions')}>Terms & Conditions</span></p>
        <p className="text-xs text-center mt-2">Already an Existing User? <Link to='/signin' className="text-black font-bold">Sign In</Link></p>
      </div>

      <p className="text-xs font-light text-gray-500 mt-2 text-center pb-5">
        www.digitalgita.com | www.cyberspacedigital.in <br />
        &copy; 2024 Cyber Space Digital. All rights reserved.
      </p>
    </div>
  );
};

export default Signup;
