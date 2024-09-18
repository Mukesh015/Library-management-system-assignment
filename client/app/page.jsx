"use client";
import react, { useState } from "react";

export default function Home() {
  const [isUserLogin, setIsUserLogin] = useState(true);

  const toggleLogin = () => {
    setIsUserLogin(!isUserLogin);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border h-[30rem] w-[30rem] rounded-md mt-32 shadow-lg bg-slate-100">
          <h1 className="text-3xl text-rose-600 font-bold ml-40 mt-10">
            {isUserLogin ? "User Login" : "Admin Login"}
          </h1>
          <div className="mt-16 flex flex-col justify-center items-center space-y-7">
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Enter email</label>
              <input
                className="border-gray-500 border w-[20rem] px-3 py-1.5"
                placeholder="name@company.com"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Enter password</label>
              <input
                className="border-gray-500 border w-[20rem] px-3 py-1.5"
                type="text"
                placeholder="******"
              />
            </div>
            <button className="bg-rose-500 mt-20 px-20 py-2 text-white rounded-md">
              Login
            </button>
          </div>
          <div className="flex flex-row justify-between p-5 mt-7">
            <span className="text-blue-500 underline cursor-pointer hover:text-blue-900">
              Cant login? click here
            </span>
            <span onClick={toggleLogin} className="text-blue-500 underline cursor-pointer hover:text-blue-900">
              {isUserLogin ? "Admin Login" : "User Login"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
