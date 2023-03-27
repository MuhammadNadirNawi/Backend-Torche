const router = require("express").Router();
const servicesControllers  = require("../app/controllers/serviceControllers");
const {verifyToken, authAdmin} = require("../middleware/auth");
const uploader = require("../middleware/uploader")



router.post('/api/services/create', uploader.single("icon"), servicesControllers.createServices);
router.get('/api/services/findAll', servicesControllers.findAllServices);
router.get('/api/services/:id', servicesControllers.findServicesById);
// router.put('/api/tutors/update/:id', verifyToken, authAdmin, servicesControllers.updateTutorsById);
// router.delete('/api/tutors/delete/:id', verifyToken, authAdmin, servicesControllers.deleteTutorsById);

module.exports = router