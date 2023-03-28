const router = require("express").Router();
const eventsControllers  = require("../app/controllers/eventsControllers");
const {verifyToken, authAdmin} = require("../middleware/auth");
const {createCourseValidation, runValidation} = require("../validation/index");
const uploader = require("../middleware/uploader")


router.post('/api/events/create', uploader.single('image'), eventsControllers.createEvents);
router.get('/api/events/findAll', eventsControllers.findAllEvents);
router.get('/api/events/search', eventsControllers.searchingEvents);
router.get('/api/events/:id', eventsControllers.findEventsById);
router.put('/api/events/update/:id', eventsControllers.updateEventsById);
router.delete('/api/events/delete/:id', eventsControllers.deleteEventsById);

module.exports = router