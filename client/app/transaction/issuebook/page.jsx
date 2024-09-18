"use client"

import React, { useState } from "react";

export default function IssueBook() {
  // Example list of available books
  const [books] = useState([
    { id: "B001", name: "The Great Gatsby", author: "F. Scott Fitzgerald", returnDate: "2024-10-15" },
    { id: "B002", name: "To Kill a Mockingbird", author: "Harper Lee", returnDate: "2024-10-20" },
    { id: "B003", name: "1984", author: "George Orwell", returnDate: "2024-10-25" },
  ]);

  // State to hold the selected book
  const [selectedBook, setSelectedBook] = useState(null);

  // Handle book selection from dropdown
  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = books.find(b => b.id === bookId);
    setSelectedBook(book);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Issue Book
        </h1>

        {/* Book dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Book
          </label>
          <select
            className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleBookChange}
          >
            <option value="">-- Select a book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name} (ID: {book.id})
              </option>
            ))}
          </select>
        </div>

        {/* Author Name - Auto-filled */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Author Name
          </label>
          <input
            type="text"
            className="w-full border-gray-300 border px-4 py-2 rounded-md"
            value={selectedBook ? selectedBook.author : ""}
            readOnly
          />
        </div>

        {/* Return Date - Auto-filled */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Return Date
          </label>
          <input
            type="text"
            className="w-full border-gray-300 border px-4 py-2 rounded-md"
            value={selectedBook ? selectedBook.returnDate : ""}
            readOnly
          />
        </div>

        {/* Remarks field */}
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

        {/* Issue button */}
        <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Issue Book
        </button>
      </div>
    </div>
  );
}
