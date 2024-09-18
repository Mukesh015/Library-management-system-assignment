const {createAdmin,adminLogin,createUser,modifyUser }=require('../controller/admin.js')
const express = require('express');
const router = express.Router();

router.post('/createAdmin',createAdmin);
router.post('/adminlogin',adminLogin);
router.post('/createUser',createUser);
router.put('/modify/:userId', modifyUser);

module.exports = router;