"use client";

import React, { useEffect, useCallback, useState } from "react";
import dayjs from "dayjs";
import { useUser } from "@/provider/UserContext";

export default function CheckBook() {
  const { userID } = useUser();
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState(
    dayjs().add(7, "day").format("YYYY-MM-DD")
  );
  const [remarks, setRemarks] = useState("");

  const fetchAvailableBooks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5051/book/bookdetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBooks(data);
      console.log("Available books:", data);
    } catch (e) {
      console.error("book available fetch failed", e);
    }
  }, []);

  useEffect(() => {
    fetchAvailableBooks();
  }, [fetchAvailableBooks,userID]);

  const handleIssueBook = (book) => {
    setSelectedBook(book);
    // Calculate return date to be one week from now
    setReturnDate(dayjs().add(7, "day").format("YYYY-MM-DD"));
    setRemarks("");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleIssueConfirm = async() => {
    const response = await fetch("http://localhost:5051/bookop/issue",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userID.user.userId,
        bookName: selectedBook.bookName,
        returnDate: returnDate,
        remarks: remarks,
      }),
    })
    handleModalClose();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Check Book Availability
        </h2>
        {/* Rendered Book List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Available Books
          </h3>
          {books && books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <div
                  key={book.serialNumber}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4"
                >
                  <h4 className="text-lg font-semibold text-teal-800">
                    {book.bookName}
                  </h4>
                  <p className="text-gray-700">Author: {book.authorName}</p>
                  <p className="text-gray-700">
                    Availability:{" "}
                    {book.availableQuantity === "Y" ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-700">
                    Serial No: {book.serialNumber}
                  </p>
                  <button
                    onClick={() => handleIssueBook(book)}
                    className="mt-auto bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition duration-300"
                  >
                    Issue Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No books available</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Issue Book
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">
                Book Name: {selectedBook.bookName}
              </p>
              <p className="text-gray-700 font-medium">
                Author: {selectedBook.authorName}
              </p>
              <p className="text-gray-700 font-medium">
                Serial Number: {selectedBook.serialNumber}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="returnDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Return Date
              </label>
              <input
                id="returnDate"
                type="date"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={dayjs().format("YYYY-MM-DD")} // Ensure the date cannot be before today
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="remarks"
                className="block text-gray-700 font-medium mb-2"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueConfirm}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
