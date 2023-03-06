const router = require("express").Router();
const authControllers  = require("../app/controllers/authControllers");
const { registerValidation, runValidation, loginValidation } = require("../validation/index");


router.post('/api/auth/register', registerValidation, runValidation , authControllers.register);
router.post('/api/auth/login', loginValidation, runValidation, authControllers.signin);
router.post('/api/auth/verify', authControllers.verified);


module.exports = router