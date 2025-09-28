"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // This will succeed if the user has a valid token cookie
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        // If it fails, it means the user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm text-center">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Welcome to Auth Gateway
        </h1>
        <p className="text-gray-300 text-lg">
          A modern, secure, and beautiful authentication system built with
          Next.js.
        </p>

        <div className="mt-8">
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : user ? (
            <div className="space-y-4">
              <p className="text-xl text-white">
                Hello,{" "}
                <span className="font-bold text-indigo-400">
                  {user.username}
                </span>
                !
              </p>
              <Link
                href="/profile"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Your Profile
              </Link>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
