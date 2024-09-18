const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
}, { timestamps: true }); 

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
