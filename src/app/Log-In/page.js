"use client";

import { useState } from "react";
import MyLoginButton from "../Log-In-components/MyLoginButton";

export default function SignUp() {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const [apiUrl, setApiUrl] = useState("http://localhost:3000/api");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-orange-500">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gradient mb-6">Welcome!</h1>
        <form className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="login"
            >
              Login Name
            </label>
            <input
              type="text"
              id="login"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Wick"
              onChange={(e) => setLoginName(e.target.value)}
              value={loginName}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <MyLoginButton
            loginName={loginName}
            password={password}
            setLoginName={setLoginName}
            setPassword={setPassword}
            apiUrl={apiUrl}
          />
        </form>
      </div>
    </div>
  );
}
