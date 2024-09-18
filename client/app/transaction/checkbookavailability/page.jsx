import React from "react";

export default function CheckBook() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Check Book Availability
        </h2>
        <div className="flex flex-col md:flex-row gap-6"> 
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <label
              htmlFor="bookName"
              className="text-gray-700 font-medium"
            >
              Enter book name
            </label>
            <input
              id="bookName"
              className="border-gray-300 border w-[20rem] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Eg. xyz book"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <label
              htmlFor="authorName"
              className="text-gray-700 font-medium"
            >
              Enter author name
            </label>
            <input
              id="authorName"
              className="border-gray-300 border w-[20rem] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Eg. xyz author"
              type="text"
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Search Book
        </button>
        <div className="h-80 mt-5 flex flex-col gap-5">
            <h2 className="text-teal-500 font-bold ml-64 text-lg">Search Results</h2>
            <div>
                <div>Book Name: xyz</div>
                <div>Author: xyz author</div>
                <div>Availability: Yes</div>
                <div>Current Location: Library 1</div>
            </div>
        </div>
      </div>
    </div>
  );
}
