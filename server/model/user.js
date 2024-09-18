const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  issuedBooks: [{
    bookName: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      default: null
    },
    issueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      required: true
    },
    remarks: {
      type: String,
      default: null
    },
    serialNumber:{
      type: String,
      required: true
    }
  }]
});

// Create the user model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
