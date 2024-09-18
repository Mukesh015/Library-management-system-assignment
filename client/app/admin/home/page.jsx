"use client";
import React, { useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [showTransactionDropdown, setShowTransactionDropdown] = useState(false);

  const toggleMaintainenceDropdown = () => {
    setShowTransactionDropdown(!showTransactionDropdown);
  };

  return (
    <>
      <nav className="bg-rose-700 px-80 py-3">
        <ul className="flex flex-row justify-between">
          <Link href="/admin/maintainence">
            <li className="text-white font-semibold cursor-pointer hover:text-slate-200">
              Maintainence
            </li>
          </Link>
          <li className="text-white font-semibold cursor-pointer hover:text-slate-200">
            Report
          </li>
          <li
            onClick={() => toggleMaintainenceDropdown()}
            className="text-white font-semibold cursor-pointer hover:text-slate-200"
          >
            Transaction
          </li>
          <li className="text-white font-semibold cursor-pointer hover:text-red-950">
            Logout
          </li>
        </ul>
      </nav>
      {showTransactionDropdown && <TransactionDropDown />}
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

const TransactionDropDown = () => {
  return (
    <ul className="text-white fixed bg-rose-500 ml-[51rem] mt-1 rounded-md py-2">
      <Link href={"/transaction/checkbookavailability"}>
        <li className="hover:bg-rose-700 px-5 cursor-pointer py-1">
          Check available books
        </li>
      </Link>
      <Link href={"/transaction/issuebook"}>
        <li className="hover:bg-rose-700 px-5 cursor-pointer py-1">
          Issue books
        </li>
      </Link>
      <Link href={"/transaction/returnbook"}>
        <li className="hover:bg-rose-700 px-5 cursor-pointer py-1">
          Return books
        </li>
      </Link>
      <Link href={"/transaction/fine"}>
        <li className="hover:bg-rose-700 px-5 cursor-pointer py-1">Pay fine</li>
      </Link>
    </ul>
  );
};

export default HomePage;
