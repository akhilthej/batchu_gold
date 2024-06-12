import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CRUD_API } from '../../hooks/APIHooks';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState({
    emailaddress: '',
    phonenumber: '',
    sex: '',
    address: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data to populate the form
    const fetchData = async () => {
      try {
        const response = await fetch(`${CRUD_API}?emailaddress=${user.emailaddress}`);
        const data = await response.json();

        if (response.ok) {
          const [first, last] = data.name.split(' ');
          setFirstName(first);
          setLastName(last);
          setUser({
            emailaddress: data.emailaddress,
            phonenumber: data.phonenumber,
            sex: data.sex,
            address: data.address,
          });
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    fetchData();
  }, [user.emailaddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onUpdatePress = async () => {
    setError('');
    try {
      const response = await fetch(CRUD_API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          ...user,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'success') {
          navigate('/profile');
        } else {
          setError(data.message);
        }
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('Update error', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-lg font-bold text-center">Edit Your Profile</h1>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        <input
          type="email"
          name="emailaddress"
          value={user.emailaddress}
          placeholder="Email"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
          readOnly
        />
        <input
          type="tel"
          name="phonenumber"
          value={user.phonenumber}
          placeholder="Phone Number"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        <input
          type="text"
          name="sex"
          value={user.sex}
          placeholder="Sex"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        <input
          type="text"
          name="address"
          value={user.address}
          placeholder="Address"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

        <button onClick={onUpdatePress} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 mt-6 w-full rounded-full">
          Update Profile
        </button>
      </div>
      <p className="text-xs font-light text-gray-500 mt-6 text-center pb-5">
        www.digitalgita.com | www.cyberspacedigital.in <br />
        &copy; 2024 Cyber Space Digital. All rights reserved.
      </p>
    </div>
  );
};

export default ProfileEdit;
