const router = require("express").Router();
const cors = require("cors")
const cookieParser = require('cookie-parser')


const tutors = require('./tutors')
const auth = require('./auth')
const users = require('./users')

router.use(cors())
router.use(cookieParser())
router.use(tutors)
router.use(auth)
router.use(users)

module.exports = router
