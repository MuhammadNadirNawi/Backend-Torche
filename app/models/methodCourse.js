const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  field: { type: String, required: true },
  });

const methodCourseSchema = new mongoose.Schema(
  {
    nameMethod: { type: String, required: true,},
    description: { type: String, required: true,},
    benefit: [benefitSchema],
  },
  { timestamps: true }
  );

const MethodCourses = mongoose.model("MethodCourses", methodCourseSchema);


module.exports = MethodCourses;