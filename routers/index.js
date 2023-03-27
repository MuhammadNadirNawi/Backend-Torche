const router = require("express").Router();
const cors = require("cors")
const cookieParser = require('cookie-parser')
const session = require('express-session')


const tutors = require('./tutors')
const auth = require('./auth')
const users = require('./users')
const reviewTutor = require('./ReviewTutor')
const courses = require('./courses')
const reviewCourse = require('./reviewCourse')
const registerCourse = require('./registerCourse')
const methodCourse = require('./methodCourse')
const paymentGateway = require('./paymentGateway')
const events = require('./events')
const services = require('./services')

router.use(cors())
router.use(cookieParser())
router.use(tutors)
router.use(auth)
router.use(users)
router.use(reviewTutor)
router.use(courses)
router.use(reviewCourse)
router.use(registerCourse)
router.use(methodCourse)
router.use(paymentGateway)
router.use(events)
router.use(services)
// router.use(
// 	session({
// 		secret: "secr3t",
//     resave: false,
//     saveUninitialized: true,
// 		cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
// 	})
// );

module.exports = router
