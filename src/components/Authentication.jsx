import { useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Authentication() {
  // const [verified, setVerified] = useState(false);
  const value = useAuthContext();
  const verified = value ? true : false;
  console.log(verified, value);

  return verified ? <Outlet /> : <Navigate to="/login" />;
}
