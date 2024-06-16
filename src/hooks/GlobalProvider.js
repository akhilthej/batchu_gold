import React, { createContext, useState, useEffect, useContext } from 'react';
import {CRUD_API} from './APIHooks'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const response = await fetch(CRUD_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailaddress: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const userData = {
          name: data.data.name,
          emailaddress: data.data.emailaddress,
          phonenumber: data.data.phonenumber,
          role: data.data.role,
          sex: data.data.sex,
          address: data.data.address,
        };
        localStorage.setItem('userToken', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const loadUser = () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setUser(JSON.parse(userToken));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
