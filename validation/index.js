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
];

FirstSignValidation = [
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

createTutorValidation = [
  check("tutorName", "tutorName is required").notEmpty(),
  check("description", "description is required").notEmpty(),
  check("specialist", "specialist is required").notEmpty(),
  check("socialMedia", "socialMedia is required").notEmpty(),
  check("education", "education is required").notEmpty(),
  check("experience", "experience from is required").notEmpty(),
];

createReviewTutorValidation = [
  check("idUser", "idUser is required").notEmpty(),
  check("idTutor", "idTutor is required").notEmpty(),
  check("review", "review is required").notEmpty(),
  check("rating", "rating is required").notEmpty(),
];

createCourseValidation = [
  check("nameCourse", "nameCourse is required").notEmpty(),
  check("description", "description is required").notEmpty(),
  check("typeCourse", "typeCourse is required").notEmpty(),
  check("participant", "participant is required").notEmpty(),
  check("module", "module is required").notEmpty(),
  check("tutors", "tutors is required").notEmpty(),
];

createReviewCourseValidation = [
  check("idUser", "idUser is required").notEmpty(),
  check("idCourse", "idCourse is required").notEmpty(),
  check("review", "review is required").notEmpty(),
  check("rating", "rating is required").notEmpty(),
];

createMethodCourseValidation = [
  check("nameMethod", "nameMethod is required").notEmpty(),
  check("description", "description is required").notEmpty(),
  check("benefit", "benefit is required").notEmpty(),
];

module.exports = {
  registerValidation,
  loginValidation,
  runValidation,
  FirstSignValidation,
  createTutorValidation,
  createReviewTutorValidation,
  createCourseValidation,
  createReviewCourseValidation,
  createMethodCourseValidation,
}