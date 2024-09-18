const User = require('../model/user');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'userId and password are required' });
    }

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Password matches, login successful
        return res.status(200).json({
            message: 'Login successful',
            user: {
                userId: user.userId,
                userName: user.userName,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Error logging in' });
    }
};



const getIssuedBook = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const issuedBooks = user.issuedBooks.map(book => ({
            bookName: book.bookName,
            serialNumber: book.serialNumber
        }));

        res.json({ issuedBooks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}





module.exports = { loginUser, getIssuedBook }