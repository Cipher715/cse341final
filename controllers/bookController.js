const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDb().db().collection('book').find();
    result.toArray().then((book,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
        }
      });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('book').find({ _id: bookId });
    result.toArray().then((book,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book[0]);
        }
    });
};

const getBookByAuthor = async (req, res) => {
    //#swagger.tags=['Books']
    const author = req.params.author;
    const result = await mongodb.getDb().db().collection('book').find({ author: author });
    result.toArray().then((book,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
        }
    });
};

const getBookByGenre = async (req, res) => {
    //#swagger.tags=['Books']
    const author = req.params.genre;
    const result = await mongodb.getDb().db().collection('book').find({ genre: genre });
    result.toArray().then((book,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
        }
    });
};


const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      pages: req.body.pages,
      language: req.body.language,
      price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('book').insertOne(book);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the book');
    }
};
  
const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your book id to update a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        pages: req.body.pages,
        language: req.body.language,
        price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('book').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the book');
    }
};
  
const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your book id to delete a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('book').deleteOne({ _id: bookId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the book');
    }
};
  
module.exports = {
    getAll,
    getSingle,
    getBookByAuthor,
    getBookByGenre,
    createBook,
    updateBook,
    deleteBook,
};