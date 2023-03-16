import React, { useState } from "react";
import userService from "../../services/usersSerivce";

export const authContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const signUp = (user) => {
    return userService.signUp(user);
  };

  const signIn = (user) => {
    return userService.signIn(user);
  };

  const logOut = () => {
    return userService.logOut();
  };

  const getJwt = () => {
    return userService.getJwt();
  };

  const user = () => {
    return userService.user();
  };

  return (
    <authContext.Provider value={{ signUp, signIn, logOut, getJwt, user }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
