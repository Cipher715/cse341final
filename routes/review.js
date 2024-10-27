const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

// Get all review router
router.get('/', reviewController.getAll);
// Get single review router
router.get('/:id', reviewController.getSingle);
// Get books by book
router.get('/find-by-book/:bookId', reviewController.getReviewByBook);
// Get books by user 
router.get('/find-by-user/:username', reviewController.getReviewByUser);
// Insert new boook router
router.post('/', isAuthenticated, validation.checkReview, reviewController.createReview);
// Update an review router
router.put('/:id', isAuthenticated, validation.checkReview, reviewController.updateReview);
// Delete an review router
router.delete('/:id', isAuthenticated, reviewController.deleteReview);


module.exports = router;
