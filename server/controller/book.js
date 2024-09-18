const Book = require("../model/book");

// Controller for adding a new book
const addBook = async (req, res) => {
  try {
    const { bookName, authorName, quantity } = req.body;

    // Check if the bookName is provided
    if (!bookName) {
      return res.status(400).json({ error: "Book name is required." });
    }

    // Create a new book with auto-generated serialNumber
    const newBook = new Book({
      bookName,
      authorName, // Will be null if not provided
      quantity: quantity !== undefined ? quantity : 1, // Use provided quantity or default to 1
    });

    // Save the book to the database
    await newBook.save();

    res
      .status(201)
      .json({ message: "Book added successfully!", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add the book." });
  }
};

const findBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    const response = books.map((book) => ({
      serialNumber: book.serialNumber,
      bookName: book.bookName,
      authorName: book.authorName || "Not provided",
      availableQuantity: book.quantity > 0 ? "Y" : "N",
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books." });
  }
};

module.exports = {
  addBook,
  findBooks,
};
