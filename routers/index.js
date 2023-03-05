const router = require("express").Router();
const cors = require("cors")

const tutors = require('./tutors')
const auth = require('./auth')

router.use(cors())
router.use(tutors)
router.use(auth)

module.exports = router
