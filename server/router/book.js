const express = require('express');
const router = express.Router();
const { addBook } = require('../controller/book');

// POST route for adding a new book
router.post('/add', addBook);

module.exports = router;
