"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useUser } from "@/provider/UserContext";

export default function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [remarks, setRemarks] = useState("");
  const { userID } = useUser();

  // Fetch all issued books for the logged-in user
  const fetchIssuedBooks = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5051/user/issued-book/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    }
  }, [userID]);

  // Handle book return
  const returnIssueBook = async () => {
    if (!selectedBook) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5051/bookop/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          bookName: selectedBook.bookName,
          serialNumber: selectedBook.serialNumber,
          remarks: remarks,
        }),
      });

      const data = await response.json();
      setBooks(data);
      setSelectedBook(null);
      setRemarks("");
      console.log("Book returned successfully", data);
    } catch (e) {
      console.error("Error returning book:", e);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, [fetchIssuedBooks]);

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
          <select
            className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedBook ? selectedBook.serialNumber : ""}
            onChange={(e) =>
              setSelectedBook(
                books.find((book) => book.serialNumber === e.target.value)
              )
            }
          >
            <option value="">-- Select a book --</option>
            {books?.map((book) => (
              <option key={book.serialNumber} value={book.serialNumber}>
                {book.bookName} (Issued: {book.issueDate})
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
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
          ></textarea>
        </div>

        {/* Return Book button */}
        <button
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={returnIssueBook}
        >
          Return Book
        </button>
      </div>
    </div>
  );
}
