import { useState } from "react";
import { auth } from "../api/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  console.log("login mounting");

  const navigate = useNavigate();

  function routeBack() {
    navigate("/");
  }

  function handleLogin() {
    let verification;
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("sign in successful", verification);
        navigate("/my-anime");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <div className=" h-[80vh] flex justify-center items-center">
      <div className="login-container" id="loginForm">
        <h2 className="text-2xl font-bold">Login</h2>

        <button className="btn font-semibold" onClick={handleLogin}>
          Sign In with gmail
        </button>
        <button
          className="mt-6 w-full text-sm text-green-800 cursor-pointer hover:text-slate-400 flex items-center justify-center"
          onClick={routeBack}
        >
          return to homepage
        </button>
      </div>
    </div>
  );
}
