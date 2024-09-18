const Book = require('../model/book');
const User = require('../model/user');

// Controller for issuing a book
const issueBook = async (req, res) => {
  try {
    const { userId, bookName, authorName, remarks } = req.body;
  

    if (!userId || !bookName ) {
      return res.status(400).json({ error: 'User ID, Book Name, Issue Date, and Return Date are required.' });
    }

 
    const book = await Book.findOne({ bookName });

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }


    if (book.quantity <= 0) {
      return res.status(400).json({ error: 'Book is not available.' });
    }


    book.quantity -= 1;
    await book.save();


    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

   
    user.issuedBooks.push({
      bookName,
      serialNumber:book.serialNumber,
      authorName: authorName || "Not provided",
      issueDate,
      returnDate,
      remarks: remarks || "No remarks"
    });

    await user.save();

    res.status(201).json({ message: 'Book issued successfully!', issue: user.issuedBooks.slice(-1)[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to issue the book.' });
  }
};


const returnBook = async (req, res) => {
  try {
      const { userId, bookName, serialNumber,  } = req.body;

 
      if (!userId || !bookName || !serialNumber ) {
          return res.status(400).json({ error: 'User ID, Book Name, Serial Number, Issue Date, and Return Date are required.' });
      }


      const book = await Book.findOne({ serialNumber });

      if (!book) {
          return res.status(404).json({ error: 'Book not found.' });
      }


      book.quantity += 1;
      await book.save();


      const user = await User.findOne({
          userId,

      });

      if (!user) {
          return res.status(404).json({ error: 'Issuance record not found for the specified user.' });
      }

      user.issuedBooks = user.issuedBooks.filter(issue =>
          !(issue.serialNumber === serialNumber)
      );

      await user.save();

      res.status(200).json({ message: 'Book returned successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to return the book.' });
  }
};

module.exports = {
  issueBook,returnBook
};
