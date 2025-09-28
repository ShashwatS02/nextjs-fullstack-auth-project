"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
      } catch (error: any) {
        console.log(error.message);
        toast.error("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 space-y-6 bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm text-center">
        <h1 className="text-4xl font-bold text-white">Your Profile</h1>
        <p className="text-gray-400">Welcome to your personal dashboard.</p>
        <hr className="border-gray-700" />
        {loading ? (
          <p className="text-white">Loading user details...</p>
        ) : (
          <div className="text-left space-y-4 text-white">
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <div className="flex justify-center pt-4">
              <Link
                href={`/profile/${user._id}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                View Public Profile
              </Link>
            </div>
          </div>
        )}
        <hr className="border-gray-700" />
        <div className="flex justify-center pt-4">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
