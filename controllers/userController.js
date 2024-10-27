const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db().collection('user').find();
    result.toArray().then((user,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
        }
      });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user').find({ _id: userId });
    result.toArray().then((user,err) => {
        if (err) {
          res.status(400).json({ message: err });
        }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
        }
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDb().db().collection('user').insertOne(user);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the user');
    }
};
  
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your user id to update a user.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDb().db().collection('user').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the user');
    }
};
  
const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id entered. Check your user id to delete a user.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('user').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while updating the user');
    }
};
  
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};