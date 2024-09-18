"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(true); // Flag to toggle between create and update

  const handleUserCreation = async () => {
    try {
      const response = await fetch("http://localhost:5051/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName }),
      });
      if (response.ok) {
        toast.success("User created successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        console.log("User created", await response.json());
      } else {
        toast.error("Failed to create user", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        console.error("Failed to create user", await response.json());
      }
    } catch (e) {
      console.error("Error creating user:", e);
      toast.error("Failed to create user", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const handleUserUpdate = async () => {
    const userId = prompt("Enter user ID");
    try {
      const response = await fetch(`http://localhost:5051/modify/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      if (response.ok) {
        toast.success("User credentials updated", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        console.log("User details updated", await response.json());
      } else {
        toast.error("Failed to update credentials", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        console.error("Failed to update credentials", await response.json());
      }
    } catch (e) {
      console.error("Failed to update credentials, server error", e);
      toast.error("Failed to update credentials, server error", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isCreatingUser ? "Create User" : "Update User"}
          </h1>

          {/* Username input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Password input */}
          {!isCreatingUser && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {/* Toggle button between create/update user */}
          <div className="flex items-center justify-between mb-6">
            <button
              className={`w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300`}
              onClick={isCreatingUser ? handleUserCreation : handleUserUpdate}
            >
              {isCreatingUser ? "Create User" : "Update User"}
            </button>
          </div>

          {/* Toggle between Create and Update user */}
          <div className="text-center">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsCreatingUser(!isCreatingUser)}
            >
              {isCreatingUser
                ? "Already have a user? Update here"
                : "Want to create a new user?"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
