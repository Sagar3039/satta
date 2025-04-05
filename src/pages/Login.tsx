// pages/Login.tsx
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, FormEvent } from "react";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/AdminDashboard");
    } catch (error: any) {
      toast.error(`❌ Login failed: ${error.message}`, {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <p className="text-xl font-semibold text-center text-black mb-4">
          Sign in to your account
        </p>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-lg uppercase"
        >
          Sign in
        </button>

        <p className="text-gray-500 text-sm text-center mt-3">
          No account?
          <Link
            to="/register"
            className="underline ml-1 text-blue-600 hover:text-blue-800"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
