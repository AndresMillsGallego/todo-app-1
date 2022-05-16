import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

const jwt = require('jsonwebtoken')

const testUser = {
  Andres: {
    password: 'password',
    name: 'Andres',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  }
}

const AuthProvider = ({ children }) => {

  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState({});

  const can = (capability) => {
    return user?.capabilities?.includes(capability); // Cool way to write this, need to research the syntax
  }

  const login = async (username, password) => { 
    let user = await axios.post('https://api-js401.herokuapp.com/signin', {}, {
      auth: {
        username,
        password,
      }
    })
    console.log(user)
    let creds = user.data;

    if (creds) {
      _validateToken(creds.token)
    }
    // if (creds && creds.password === password) {
    //   try {
    //     _validateToken(creds.token);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
  }

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    cookie.remove('auth')
  }

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        cookie.save('auth', token)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    let token = cookie.load('auth')
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const values = {
    user, 
    can, 
    isLoggedIn, 
    login,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;