const router = require("express").Router();
const tutorsControllers  = require("../app/controllers/tutorsControllers");


router.post('/api/tutors/create', tutorsControllers.createTutors);
router.get('/api/tutors/findAll', tutorsControllers.findAllTutors);
router.get('/api/tutors/:id', tutorsControllers.findTutorsById);
router.put('/api/tutors/update/:id', tutorsControllers.updateTutorsById);
router.delete('/api/tutors/delete/:id', tutorsControllers.deleteTutorsById);

module.exports = router