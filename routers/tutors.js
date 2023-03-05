const router = require("express").Router();
const tutorsControllers  = require("../app/controllers/tutorsControllers");
const {verifyToken, authAdmin} = require("../middleware/auth");


router.post('/api/tutors/create', verifyToken, authAdmin, tutorsControllers.createTutors);
router.get('/api/tutors/findAll', tutorsControllers.findAllTutors);
router.get('/api/tutors/:id', tutorsControllers.findTutorsById);
router.put('/api/tutors/update/:id', verifyToken, authAdmin, tutorsControllers.updateTutorsById);
router.delete('/api/tutors/delete/:id', verifyToken, authAdmin, tutorsControllers.deleteTutorsById);

module.exports = router