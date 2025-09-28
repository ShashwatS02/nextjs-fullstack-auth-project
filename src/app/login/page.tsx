"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.response?.data);
      toast.error(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            {loading ? "Processing..." : "Login to Your Account"}
          </h1>
          <p className="text-gray-400">Welcome back! Please sign in.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <Link
                className="text-sm text-gray-400 hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          onClick={onLogin}
          className={`w-full py-2 font-semibold text-black rounded-md transition-colors ${
            buttonDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center">
          <Link
            className="text-sm text-gray-400 hover:underline"
            href="/signup"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
