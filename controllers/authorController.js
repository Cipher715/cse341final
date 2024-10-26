const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Authors']
    const result = await mongodb.getDb().db().collection('author').find();
    result.toArray().then((author,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(author);
        }
      });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Authors']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your author id to find a author.');
    }
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('author').find({ _id: authorId });
    result.toArray().then((author,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(author[0]);
        }
    });
};

const createAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    const author = {
        name: req.body.name,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDb().db().collection('author').insertOne(author);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the author');
    }
};
  
const updateAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your author id to update a author.');
    }
    const authorId = new ObjectId(req.params.id);
    const author = {
        name: req.body.name,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDb().db().collection('author').replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the author');
    }
};
  
const deleteAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your author id to delete a author.');
    }
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('author').deleteOne({ _id: authorId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the author');
    }
};
  
module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};