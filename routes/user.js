const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

// Get all user router
router.get('/', userController.getAll);
// Get single user router
router.get('/:id', userController.getSingle);
// Insert new boook router
router.post('/', isAuthenticated, validation.checkUser, userController.createUser);
// Update an user router
router.put('/:id', isAuthenticated, validation.checkUser, userController.updateUser);
// Delete an user router
router.delete('/:id', isAuthenticated, userController.deleteUser);


module.exports = router;
