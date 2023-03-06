const mongoose = require("mongoose");

const reviewTutorsSchema = new mongoose.Schema(
  {
    idUser: { type:  mongoose.Types.ObjectId, ref: 'Users' },
    idTutor: { type:  mongoose.Types.ObjectId, ref: 'Tutors' },
    review: { type: String, required: true,},
    rating: {type: Number, min: 1, max: 5, required: true,},
  },
  { timestamps: true }
  );

const ReviewTutor = mongoose.model("ReviewTutor", reviewTutorsSchema);

module.exports = ReviewTutor;