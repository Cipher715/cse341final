const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validation = require('../middleware/validate');


// Get all book router
router.get('/', bookController.getAll);
// Get single book router
router.get('/:id', bookController.getSingle);
// Insert new boook router
router.post('/', validation.checkBook, bookController.createBook);
// Update a book router
router.put('/:id', validation.checkBook, bookController.updateBook);
// Delete a book router
router.delete('/:id', bookController.deleteBook);


module.exports = router;
