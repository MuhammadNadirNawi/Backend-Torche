const router = require("express").Router();
const registerCourseControllers  = require("../app/controllers/registerCourseControllers");
const {verifyToken, authUser, authAdmin} = require("../middleware/auth");
const {createRegisterCourseValidation, runValidation} = require("../validation/index");



router.post('/api/courses/register', verifyToken, createRegisterCourseValidation, runValidation, registerCourseControllers.createRegisterCourses);
router.get('/api/courses/register/findAll', verifyToken, authAdmin, registerCourseControllers.findAllRegisterCourses);
router.get('/api/courses/register/:id',verifyToken, authAdmin, registerCourseControllers.findRegisterCourseById);
router.delete('/api/courses/register/delete/:id', verifyToken, authAdmin, registerCourseControllers.deleteRegisterCourseById);

module.exports = router