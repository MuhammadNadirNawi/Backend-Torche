const router = require("express").Router();
const reviewCoursesControllers  = require("../app/controllers/reviewCoursesControllers");
const {verifyToken, authUser} = require("../middleware/auth");
const {createReviewCourseValidation, runValidation} = require("../validation/index");


router.post('/api/reviews/courses/create', verifyToken, createReviewCourseValidation, runValidation, reviewCoursesControllers.createReviewCourse);
router.get('/api/reviews/courses/findAll', reviewCoursesControllers.findAllReviewCourse);
router.get('/api/reviews/courses/byUser', reviewCoursesControllers.findReviewCourseByUser);
router.get('/api/reviews/courses/byCourse', reviewCoursesControllers.findReviewCourseByCourse);
router.get('/api/reviews/courses/:id', reviewCoursesControllers.findReviewCourseById);
router.put('/api/reviews/courses/update/:id', verifyToken, reviewCoursesControllers.updateReviewCoursesById);
router.delete('/api/reviews/courses/delete/:id', verifyToken, reviewCoursesControllers.deleteReviewCoursesById);

module.exports = router