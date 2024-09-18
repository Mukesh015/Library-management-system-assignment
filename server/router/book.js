const express = require('express');
const router = express.Router();
const { addBook,findBooks } = require('../controller/book');


router.post('/add', addBook);
router.get('/bookdetails', findBooks);


module.exports = router;
