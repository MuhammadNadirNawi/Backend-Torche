const mongoose = require("mongoose");

const reviewCoursesSchema = new mongoose.Schema(
  {
    idUser: { type:  mongoose.Types.ObjectId, ref: 'Users' },
    idCourse: { type:  mongoose.Types.ObjectId, ref: 'Courses' },
    review: { type: String, required: true,},
    rating: {type: Number, min: 1, max: 5, required: true,},
  },
  { timestamps: true }
  );

const ReviewCourse = mongoose.model("ReviewCourse", reviewCoursesSchema);

module.exports = ReviewCourse;