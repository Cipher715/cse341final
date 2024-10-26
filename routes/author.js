const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

// Get all author router
router.get('/', authorController.getAll);
// Get single author router
router.get('/:id', authorController.getSingle);
// Insert new boook router
router.post('/', isAuthenticated, validation.checkAuthor, authorController.createAuthor);
// Update an author router
router.put('/:id', isAuthenticated, validation.checkAuthor, authorController.updateAuthor);
// Delete an author router
router.delete('/:id', isAuthenticated, authorController.deleteAuthor);


module.exports = router;
