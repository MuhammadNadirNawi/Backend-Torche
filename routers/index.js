const router = require("express").Router();
const cors = require("cors")

const tutors = require('./tutors')

router.use(cors())
router.use(tutors)

module.exports = router
