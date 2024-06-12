import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider';
import { CRUD_API } from '../../hooks/APIHooks';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({
    emailaddress: '',
    phonenumber: '',
    sex: '',
    address: '', // Include address field
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user.name) {
      const nameParts = user.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
    setUserData({
      ...userData,
      emailaddress: user.emailaddress,
      phonenumber: user.phonenumber || '',
      sex: user.sex || '',
      address: user.address || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onUpdatePress = async () => {
    setError('');
    setSuccessMessage(''); // Reset success message
    try {
      const response = await fetch(CRUD_API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          ...userData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'success') {
          setSuccessMessage('Profile updated successfully');
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
          value={userData.emailaddress}
          placeholder="Email"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
          readOnly
        />
        <input
          type="tel"
          name="phonenumber"
          value={userData.phonenumber}
          placeholder="Phone Number"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        <div className="relative mt-4">
          <select
            name="sex"
            value={userData.sex}
            onChange={handleInputChange}
            className="border-b border-gray-300 py-2 text-base text-black w-full appearance-none"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <input
          type="text"
          name="address"
          value={userData.address}
          placeholder="Address"
          onChange={handleInputChange}
          className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
        />
        {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
        {successMessage && <p className="text-sm text-green-500 mt-2 text-center">{successMessage}</p>}

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
