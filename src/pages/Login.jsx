import { useState } from "react";
import { handleGmailLogin } from "../api/firebase";

export default function Login() {
  function verify() {
    console.log(handleGmailLogin().then((res) => console.log(res)));
  }

  return (
    <div className=" h-[80vh] flex justify-center items-center">
      <div className="login-container" id="loginForm">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn" id="login">
          Sign In
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="btn" onClick={verify}>
          Sign In with gmail
        </button>
      </div>
    </div>
  );
}
