const router = require("express").Router();
const methodCourseControllers  = require("../app/controllers/methodCourseController");
const {verifyToken, authAdmin} = require("../middleware/auth");


router.post('/api/methods/courses/create', verifyToken, authAdmin, methodCourseControllers.createMethodCourses);
router.get('/api/methods/courses/findAll', methodCourseControllers.findAllMethodCourses);
router.get('/api/methods/courses/:id', methodCourseControllers.findMethodCourseById);
router.put('/api/methods/courses/update/:id', verifyToken, authAdmin, methodCourseControllers.updateMethodCourseById);
router.delete('/api/methods/courses/delete/:id', verifyToken, authAdmin, methodCourseControllers.deleteMethodCourseById);

module.exports = router