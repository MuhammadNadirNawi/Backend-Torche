const router = require("express").Router();
const authControllers  = require("../app/controllers/authControllers");


router.post('/api/auth/register', authControllers.register);
router.post('/api/auth/login', authControllers.signin);
router.post('/api/auth/verify', authControllers.verified);
// router.get('/api/tutors/findAll', tutorsControllers.findAllTutors);
// router.get('/api/tutors/:id', tutorsControllers.findTutorsById);
// router.put('/api/tutors/update/:id', tutorsControllers.updateTutorsById);
// router.delete('/api/tutors/delete/:id', tutorsControllers.deleteTutorsById);

module.exports = router