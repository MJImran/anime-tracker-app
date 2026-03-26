import { useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyUser } from "../api/firebase";

export default function Authentication() {
  const value = useAuth();
  const [verified, setVerified] = useState(false);
  console.log(value);

  verifyUser(setVerified);
  if (!verified) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
