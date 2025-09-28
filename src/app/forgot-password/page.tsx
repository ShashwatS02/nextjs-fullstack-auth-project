"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgot-password", { email });
      setEmailSent(true);
    } catch (error: any) {
      console.log("Forgot password failed", error.response?.data);
      toast.error(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm">
        {emailSent ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
            <p className="text-gray-400 mt-4">
              A password reset link has been sent to your email address. Please
              follow the instructions to reset your password.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">
                Forgot Your Password?
              </h1>
              <p className="text-gray-400">
                No problem. Enter your email to receive a reset link.
              </p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <button
              onClick={onForgotPassword}
              className={`w-full py-2 font-semibold text-black rounded-md transition-colors ${
                !email || loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200"
              }`}
              disabled={!email || loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
