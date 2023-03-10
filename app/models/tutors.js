const mongoose = require("mongoose");

const now = new Date();
const currentYear = now.getFullYear();

const specialistSchema = new mongoose.Schema({
  field: { type: String, required: true },
  });

const socialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  link: { type: String, required: true },
  });

const educationSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  degree: { type: String, required: true },
  firstYear: { type: String, required: true },
  lastYear: { type: String, default: currentYear},
  onProcess: { type: Boolean, required: true},
  });

const experienceSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  firstYear: { type: String, required: true },
  lastYear: { type: String, default: currentYear},
  onProcess: { type: Boolean, required: true},
  });

const tutorSchema = new mongoose.Schema(
  {
    tutorName: { type: String, required: true,},
    description: { type: String, required: true,},
    specialist: [specialistSchema],
    socialMedia: [socialMediaSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    image: { type: String, required: true, default: "https://ik.imagekit.io/wx1jhmfkq/IMG-1672906796513_OHzwBXRTs.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1672906800948" },
    bestTutorOfTheMonth: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
  );

  const Tutors = mongoose.model("Tutors", tutorSchema);

module.exports = Tutors;