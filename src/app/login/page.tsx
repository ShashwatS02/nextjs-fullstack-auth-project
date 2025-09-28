"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
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
      await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
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
            {loading ? "Processing..." : "Login"}
          </h1>
          <p className="mt-2 text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 text-left"
            >
              Email
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-800 text-white"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="your-email@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 text-left"
            >
              Password
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-800 text-white"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <div className="text-center text-gray-400">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
