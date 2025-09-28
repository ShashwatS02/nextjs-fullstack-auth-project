"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    if (token) {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
        setError(false);
        toast.success("Email verified successfully!");
      } catch (error: unknown) {
        setError(true);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error || "Verification failed");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm text-center">
        <h1 className="text-4xl font-bold text-white">Verify Your Email</h1>
        <h2 className="p-2 my-4 bg-gray-800 text-orange-500 rounded-md break-all font-mono text-sm">
          {token ? `${token}` : "No token found"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl text-green-500 mb-4">Email Verified!</h2>
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Proceed to Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-white rounded-md p-2">
              Verification Failed
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
