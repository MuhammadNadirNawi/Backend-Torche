const mongoose = require("mongoose");

  const memberCourseSchema = new mongoose.Schema(
    {
      email: { type: String, required: true,},
      fullName: { type: String, required: true,},
      phone: {type: String,required: true, },
      accountDiscord: {type: String, required: true,},
    },
    { timestamps: true }
    );

  const sessionCourseSchema = new mongoose.Schema(
    {
      date: { type: String, required: true,},
      timeStart: { type: String, required: true,},
      timeEnd: { type: String, required: true,},
    },
    { timestamps: true }
    );

const registerCourseSchema = new mongoose.Schema(
  {
    email: { type: String, required: true,},
    fullName: { type: String, required: true,},
    phone: {type: String, required: true,},
    university: {type: String, required: true,},
    department: {type: String, required: true,},
    batch: { type: Number, required: true},
    knowFrom: {type: String, required: true,},
    idMethodCourse: { type:  mongoose.Types.ObjectId, ref: 'MethodCourses' },
    idCourse: { type:  mongoose.Types.ObjectId, ref: 'Courses' },
    memberCourse: [memberCourseSchema],
    sessionCourse: [sessionCourseSchema],
    price: {type: Number, required: true,},
  },
  { timestamps: true }
  );

const RegisterCourses = mongoose.model("RegisterCourses", registerCourseSchema);


module.exports = RegisterCourses;