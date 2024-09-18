"use client";
import { redirect, useRouter } from "next/navigation";
import react, { useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "@/provider/UserContext";

export default function Home() {
  const router = useRouter();
  const { userID, setUserID } = useUser();
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = useCallback(async () => {
    if (!userId || !password) {
      toast.error("Please enter both User ID and Password", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    const loginDetails = {
      userId,
      password,
    };

    const apiUrl = isUserLogin
      ? "http://localhost:5051/user/login"
      : "http://localhost:5051/adminlogin";

    const redirectPath = isUserLogin ? "/user/home" : "/admin/home";
    // Reusable function to handle API call and responses
    const performLogin = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDetails),
        });

        // Only parse the response JSON if the request was successful
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserID(data)
          toast.success(`${isUserLogin ? "User" : "Admin"} login successful`, {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
          router.push(redirectPath);
        } else {
          toast.error("Incorrect login credentials", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Something went wrong, Please try again", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    };

    await performLogin();
  }, [userId, password, isUserLogin]);

  const toggleLogin = () => {
    setIsUserLogin(!isUserLogin);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <div className="border h-[30rem] w-[30rem] rounded-md mt-32 shadow-lg bg-slate-100">
          <h1 className="text-3xl text-rose-600 font-bold ml-40 mt-10">
            {isUserLogin ? "User Login" : "Admin Login"}
          </h1>
          <div className="mt-16 flex flex-col justify-center items-center space-y-7">
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Enter userId</label>
              <input
                onChange={(e) => setUserId(e.target.value)}
                className="border-gray-500 border w-[20rem] px-3 py-1.5"
                placeholder="ad_0979"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Enter password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-500 border w-[20rem] px-3 py-1.5"
                type="text"
                placeholder="******"
              />
            </div>
            <button
              onClick={() => handleLogin()}
              className="bg-rose-500 mt-20 px-20 py-2 text-white rounded-md"
            >
              Login
            </button>
          </div>
          <div className="flex flex-row justify-between p-5 mt-7">
            <span className="text-blue-500 underline cursor-pointer hover:text-blue-900">
              Cant login? click here
            </span>
            <span
              onClick={toggleLogin}
              className="text-blue-500 underline cursor-pointer hover:text-blue-900"
            >
              {isUserLogin ? "Admin Login" : "User Login"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
