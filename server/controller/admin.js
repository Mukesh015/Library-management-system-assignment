const bcrypt = require('bcrypt');
const Admin = require('../model/admin'); 
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const User = require('../model/user');


const generateUserId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit number
  };



const createAdmin = async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'userId and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ userId, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin user created', admin: newAdmin });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const adminLogin = async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'userId and password are required' });
    }

    try {
       
        const admin = await Admin.findOne({ userId });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid userId or password' });
        }

       
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid userId or password' });
        }


        res.status(200).json({ message: 'Login successful', admin: { userId: admin.userId } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ message: 'userName is required' });
  }

  try {
    // Generate a simple 6-digit userId
    const userId = generateUserId();

    // Generate a random password
    const password = crypto.randomBytes(8).toString('hex'); // Generates a random 16-character password

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10

    // Create a new user object
    const newUser = new User({
      userId: userId,
      userName: userName,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user in the database
    await newUser.save();

    // Return the new userId and the plain (unhashed) password to the user
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        userId,
        userName,
        password, // Return the plain password here
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }
};



const modifyUser = async (req, res) => {
    const { userId } = req.params; // Get the userId from the request parameters
    const { userName, password } = req.body; // Get the new userName and password from the request body
  
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
  
    try {
      // Find the user by userId
      const user = await User.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the userName if provided
      if (userName) {
        user.userName = userName;
      }
  
      // Update the password if provided and hash it
      if (password) {
        user.password = await bcrypt.hash(password, 10); // Hash the new password
      }
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({
        message: 'User updated successfully',
        user: {
          userId: user.userId,
          userName: user.userName,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  };

module.exports = {createAdmin,adminLogin,createUser,modifyUser};