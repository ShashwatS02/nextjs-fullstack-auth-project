"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/users/reset-password", { token, password });
      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast.error(error.response.data.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Reset Your Password</h1>
          <p className="text-gray-400">Please enter your new password below.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              New Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          onClick={onResetPassword}
          className={`w-full py-2 font-semibold text-black rounded-md transition-colors ${
            !password || !confirmPassword || loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
          disabled={!password || !confirmPassword || loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
