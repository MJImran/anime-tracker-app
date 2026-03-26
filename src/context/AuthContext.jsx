import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  console.log("authprovider live");

  return (
    <AuthContext.Provider value="your value goes here">
      {children}
    </AuthContext.Provider>
  );
}
