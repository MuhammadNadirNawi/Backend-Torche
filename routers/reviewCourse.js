const router = require("express").Router();
const reviewCoursesControllers  = require("../app/controllers/reviewCoursesControllers");
const {verifyToken, authUser} = require("../middleware/auth");


router.post('/api/reviews/courses/create', verifyToken, authUser, reviewCoursesControllers.createReviewCourse);
router.get('/api/reviews/courses/findAll', reviewCoursesControllers.findAllReviewCourse);
router.get('/api/reviews/courses/byUser', reviewCoursesControllers.findReviewCourseByUser);
router.get('/api/reviews/courses/byTutor', reviewCoursesControllers.findReviewCourseByCourse);
router.get('/api/reviews/courses/:id', reviewCoursesControllers.findReviewCourseById);
router.put('/api/reviews/courses/update/:id', verifyToken, authUser, reviewCoursesControllers.updateReviewCoursesById);
router.delete('/api/reviews/courses/delete/:id', verifyToken, authUser, reviewCoursesControllers.deleteReviewCoursesById);

module.exports = router