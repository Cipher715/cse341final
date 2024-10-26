const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

// Get all book router
router.get('/', bookController.getAll);
// Get single book router
router.get('/:id', bookController.getSingle);
// Get books by author name
router.get('/find-by-author/:author', bookController.getBookByAuthor);
// Get books by genre 
router.get('/find-by-genre/:genre', bookController.getBookByGenre);
// Insert new boook router
router.post('/', isAuthenticated, validation.checkBook, bookController.createBook);
// Update a book router
router.put('/:id', isAuthenticated, validation.checkBook, bookController.updateBook);
// Delete a book router
router.delete('/:id', isAuthenticated, bookController.deleteBook);


module.exports = router;
