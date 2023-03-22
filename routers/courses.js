const router = require("express").Router();
const courseControllers  = require("../app/controllers/coursesControllers");
const {verifyToken, authAdmin} = require("../middleware/auth");
const {createCourseValidation, runValidation} = require("../validation/index");


router.post('/api/courses/create', verifyToken, authAdmin, createCourseValidation,  runValidation, courseControllers.createCourses);
router.get('/api/courses/findAll', courseControllers.findAllCourses);
router.get('/api/courses/:id', courseControllers.findCoursesById);
router.put('/api/courses/update/:id',verifyToken, authAdmin, courseControllers.updateCoursesById);
router.delete('/api/courses/delete/:id', verifyToken, authAdmin, courseControllers.deleteCoursesById);

module.exports = router