const router = require("express").Router();
const authControllers  = require("../app/controllers/authControllers");
const { registerValidation, runValidation, loginValidation } = require("../validation/index");
const passport = require("passport");


router.post('/api/auth/register', registerValidation, runValidation , authControllers.register);
router.post('/api/auth/login', loginValidation, runValidation, authControllers.signin);
router.post('/api/auth/verify', authControllers.verified);
router.get("/auth/google", passport.authenticate("google", ["profile", "email"]));
router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);



module.exports = router