const {loginUser }=require('../controller/user.js')

const express = require('express');
const router = express.Router();

router.post('/login',loginUser);

module.exports = router;