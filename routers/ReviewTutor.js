const router = require("express").Router();
const reviewTutorsControllers  = require("../app/controllers/reviewTutorsControllers");
const {verifyToken, authUser} = require("../middleware/auth");


router.post('/api/reviews/tutors/create', verifyToken, authUser, reviewTutorsControllers.createReviewTutor);
router.get('/api/reviews/tutors/findAll', reviewTutorsControllers.findAllReviewTutor);
router.get('/api/reviews/tutors/byUser', reviewTutorsControllers.findReviewTutorByUser);
router.get('/api/reviews/tutors/byTutor', reviewTutorsControllers.findReviewTutorByTutor);
router.get('/api/reviews/tutors/:id', reviewTutorsControllers.findReviewTutorById);
router.put('/api/reviews/tutors/update/:id', verifyToken, authUser, reviewTutorsControllers.updateReviewTutorsById);
router.delete('/api/reviews/tutors/delete/:id', verifyToken, authUser, reviewTutorsControllers.deleteReviewTutorsById);

module.exports = router