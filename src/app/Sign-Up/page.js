"use client";

import { useState } from "react";
import MyButton from "../Sign-Up-components/MyButton";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [loginName, setLoginName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [apiUrl, setApiUrl] = useState("http://localhost:3000/api");

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    router.push("/Log-In");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-orange-500">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gradient mb-6">Sign Up</h1>
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
              htmlFor="email"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="name@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <MyButton
              loginName={loginName}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              setLoginName={setLoginName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              apiUrl={apiUrl}
            />
            <button
              type="submit"
              className="btn-gradient text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
