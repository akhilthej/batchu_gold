import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CRUD_API } from '../../hooks/APIHooks';
import { MarketPlacebg } from '../../assets/data/Imagedata';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const sendOnboardingEmail = async (email) => {
    try {
      const response = await fetch('https://batchugold.com/apis/sendOnboardingEmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email: email
        })
      });
      const data = await response.json();
      if (data.status !== 'success') {
        console.error('Failed to send onboarding email:', data.message);
      }
    } catch (err) {
      console.error('Error sending onboarding email:', err);
    }
  };

  const onSignUpPress = async () => {
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
          role: 'customer',
          password: password,
          address: address,
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'success') {
          await sendOnboardingEmail(emailAddress); // Send the onboarding email
          navigate('/signin');
        } else {
          setError(data.message);
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-950 via-red-800 to-yellow-950" style={{
      backgroundImage: `url("${MarketPlacebg}")`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-lg font-bold text-center">Let's Start</h1>
          <h2 className="text-xl font-bold text-center">Save Grow & Earn</h2>
          <p className="text-xs text-gray-500 mt-2 text-center">100% Referral Commission . 100% Transparency</p>

          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="border-b p-2 border-gray-300 py-2 text-base text-black mt-4 w-full"
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="border-b p-2 border-gray-300 py-2 text-base text-black mt-4 w-full"
          />
          <input
            type="email"
            value={emailAddress}
            placeholder="Email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className="border-b p-2 border-gray-300 py-2 text-base text-black mt-4 w-full"
          />
          <input
            type="tel"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-b p-2 border-gray-300 py-2 text-base text-black mt-4 w-full"
          />
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="border-b p-2 border-gray-300 py-2 text-base text-black mt-4 w-full"
          />
          <div className="relative mt-4 w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-b p-2 border-gray-300 py-2 text-base text-black w-full px-2 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

          <button onClick={onSignUpPress} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 mt-6 w-full rounded-full">Sign Up</button>

          <p className="text-xs text-center mt-4">✓ I accept the following <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/termsconditions')}>Terms & Conditions</span></p>
          <p className="text-xs text-center mt-2">Already an Existing User? <Link to='/signin' className="text-black font-bold">Sign In</Link></p>
        </div>

        <p className="text-xs font-light text-gray-500 mb-16 text-center pb-5 fixed bottom-0">
        &copy; Batchu Gold |  www.batchubolg.com<br />
          Designed & Developed by 2024 Cyber Space Digital
        </p>
      </div>
    </section>
  );
};

export default Signup;
