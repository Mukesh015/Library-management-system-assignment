const {loginUser,getIssuedBook}=require('../controller/user.js')

const express = require('express');
const router = express.Router();

router.post('/login',loginUser);
router.get('/issued-book/:userId',getIssuedBook)


module.exports = router;