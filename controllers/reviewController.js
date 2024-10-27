const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Reviews']
    const result = await mongodb.getDb().db().collection('review').find();
    result.toArray().then((review,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
        }
      });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Reviews']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your review id to find a review.');
    }
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('review').find({ _id: reviewId });
    result.toArray().then((review,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review[0]);
        }
    });
};

const getReviewByBook = async (req, res) => {
    //#swagger.tags=['Reviews']
    const bookId = req.params.bookId;
    const result = await mongodb.getDb().db().collection('review').find({ bookID: bookId });
    result.toArray().then((review,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
        }
    });
};

const getReviewByUser = async (req, res) => {
    //#swagger.tags=['Reviews']
    const username = req.params.username;
    const result = await mongodb.getDb().db().collection('review').find({ username: username });
    result.toArray().then((review,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
        }
    });
};


const createReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    const review = {
        bookID: req.body.bookID,
        username: req.body.username,
        review: req.body.review,
        comment: req.body.comment,
        date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('review').insertOne(review);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the review');
    }
};
  
const updateReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your review id to update a review.');
    }
    const reviewId = new ObjectId(req.params.id);
    const review = {
        bookID: req.body.bookID,
        username: req.body.username,
        review: req.body.review,
        comment: req.body.comment,
        date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('review').replaceOne({ _id: reviewId }, review);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the review');
    }
};
  
const deleteReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your review id to delete a review.');
    }
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('review').deleteOne({ _id: reviewId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the review');
    }
};
  
module.exports = {
    getAll,
    getSingle,
    getReviewByBook,
    getReviewByUser,
    createReview,
    updateReview,
    deleteReview,
};