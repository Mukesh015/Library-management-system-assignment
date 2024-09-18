const express = require('express');
const router = express.Router();
const { issueBook,returnBook } = require('../controller/bookissue');

// POST route for issuing a book
router.post('/issue', issueBook);
router.post('/return', returnBook);


module.exports = router;
