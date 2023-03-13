const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  nameSubject: { type: String, required: true },
  description: { type: String, required: true },
  subSubject: { type: String, required: true },
  });

const tutorsCourseSchema = new mongoose.Schema({
  idtutor: { type:  mongoose.Types.ObjectId, ref: 'Tutors'}
  });

const courseSchema = new mongoose.Schema(
  {
    nameCourse: { type: String, required: true,},
    description: { type: String, required: true,},
    typeCourse: {type: String, required: true,},
    participant: {type: Number, required: true,},
    module: [moduleSchema],
    tutors: [tutorsCourseSchema],
  },
  { timestamps: true }
  );

const Courses = mongoose.model("Courses", courseSchema);


module.exports = Courses;