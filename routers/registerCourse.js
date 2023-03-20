const router = require("express").Router();
const registerCourseControllers  = require("../app/controllers/registerCourseControllers");
const {verifyToken, authUser, authAdmin} = require("../middleware/auth");


router.post('/api/courses/register', verifyToken, registerCourseControllers.createRegisterCourses);
router.get('/api/courses/register/findAll', verifyToken, authAdmin, registerCourseControllers.findAllRegisterCourses);
router.get('/api/courses/register/:id',verifyToken, authAdmin, registerCourseControllers.findRegisterCourseById);
router.delete('/api/courses/register/delete/:id', verifyToken, authAdmin, registerCourseControllers.deleteRegisterCourseById);

module.exports = router