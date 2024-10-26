const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const validation = require('../middleware/validate');


// Get all author router
router.get('/', authorController.getAll);
// Get single author router
router.get('/:id', authorController.getSingle);
// Insert new boook router
router.post('/', validation.checkauthor, authorController.createAuthor);
// Update an author router
router.put('/:id', validation.checkauthor, authorController.updateAuthor);
// Delete an author router
router.delete('/:id', authorController.deleteAuthor);


module.exports = router;
