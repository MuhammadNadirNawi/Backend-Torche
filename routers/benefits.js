const router = require("express").Router();
const benefitsControllers  = require("../app/controllers/benefitsControllers");
const {verifyToken, authAdmin} = require("../middleware/auth");
const uploader = require("../middleware/uploader")



router.post('/api/benefits/create', uploader.single("image"), benefitsControllers.createBenefits);
router.get('/api/benefits/findAll', benefitsControllers.findAllBenefits);
router.get('/api/benefits/:id', benefitsControllers.findBenefitsById);
// router.put('/api/tutors/update/:id', verifyToken, authAdmin, benefitsControllers.updateTutorsById);
// router.delete('/api/tutors/delete/:id', verifyToken, authAdmin, benefitsControllers.deleteTutorsById);

module.exports = router