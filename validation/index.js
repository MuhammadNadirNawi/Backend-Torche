const { check, validationResult } = require("express-validator");

runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      message: errors.array()[0].msg,
    });
  }
  next();
};

registerValidation = [
  check("fullName", "full name is required").notEmpty(),
  check("email", "email is required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("This email is invalid. Make sure it's written like  example@email.com"),
  check("password", "password is required").notEmpty().isLength({ min: 8 }).withMessage("Your password is too short"),
  check("phone", "phone number is required").notEmpty(),
  check("university", "university is required").notEmpty(),
  check("department", "department is required").notEmpty(),
  check("batch", "batch is required").notEmpty(),
  check("knowFrom", "know from is required").notEmpty(),
];

loginValidation = [
  check("email", "email is required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("This email is invalid. Make sure it's written like example@email.com"),
  check("password", "password is required").notEmpty().isLength({ min: 8 }).withMessage("Your password is too short"),
];

module.exports = {
  registerValidation,
  loginValidation,
  runValidation,
}