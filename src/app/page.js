"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignUp = (event) => {
    event.preventDefault();
    router.push("/Sign-Up");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-orange-500">
      <h1 className="text-3xl font-bold text-gradient mb-6">Welcome!</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
}
