const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the schema for the book model
const bookSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    default: uuidv4, // Auto-generate UUID
    unique: true
  },
  bookName: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    default: null // Optional field
  },
  quantity: {
    type: Number,
    default: 1, // Default value of 1 if not provided
    min: 0
  }
});

// Create the book model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
