const router = require("express").Router();
const cors = require("cors")
const cookieParser = require('cookie-parser')


const tutors = require('./tutors')
const auth = require('./auth')
const users = require('./users')
const reviewTutor = require('./ReviewTutor')
const courses = require('./courses')

router.use(cors())
router.use(cookieParser())
router.use(tutors)
router.use(auth)
router.use(users)
router.use(reviewTutor)
router.use(courses)

module.exports = router
