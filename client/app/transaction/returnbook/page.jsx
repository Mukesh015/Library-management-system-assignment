"use client"
import React, { useState } from "react";

export default function ReturnBook() {
  // Example list of available books
  const [books] = useState([
    { id: "B001", name: "The Great Gatsby", issueDate: "2023-01-15" },
    { id: "B002", name: "To Kill a Mockingbird", issueDate: "2023-02-10" },
    { id: "B003", name: "1984", issueDate: "2023-03-20" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Return Book
        </h1>

        {/* Book dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Book
          </label>
          <select className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Select a book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name} (ID: {book.id}, Issued: {book.issueDate})
              </option>
            ))}
          </select>
        </div>

        {/* Remarks input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Remarks
          </label>
          <textarea
            className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any remarks"
            rows={4}
          ></textarea>
        </div>

        {/* Submit button */}
        <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Return Book
        </button>
      </div>
    </div>
  );
}
