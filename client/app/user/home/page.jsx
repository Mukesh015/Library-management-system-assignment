"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <nav className="bg-rose-700 px-80 py-3">
        <ul className="flex flex-row justify-between">
          <li className="text-white font-semibold cursor-pointer hover:text-slate-200">
            Report
          </li>
          <Link href="/transaction/checkbookavailability">
            <li className="text-white font-semibold cursor-pointer hover:text-slate-200">
              Transaction
            </li>
          </Link>
          <li className="text-white font-semibold cursor-pointer hover:text-red-950">
            Logout
          </li>
        </ul>
      </nav>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-rose-600 text-white">
              <tr>
                <th className="px-4 py-2 text-center">Code No From</th>
                <th className="px-4 py-2 text-center">Code No To</th>
                <th className="px-4 py-2 text-center">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 border-b">
                <td className="px-4 py-2 text-center">001</td>
                <td className="px-4 py-2 text-center">010</td>
                <td className="px-4 py-2 text-center">Science</td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-4 py-2 text-center">011</td>
                <td className="px-4 py-2 text-center">020</td>
                <td className="px-4 py-2 text-center">Arts</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 text-center">021</td>
                <td className="px-4 py-2 text-center">030</td>
                <td className="px-4 py-2 text-center">History</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
