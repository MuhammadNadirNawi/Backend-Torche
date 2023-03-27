const mongoose = require("mongoose");

const benefitsSchema = new mongoose.Schema(
  {
    nameBenefit: { type: String, required: true,},
    description: { type: String, required: true,},
    image: { type: String, required: true,},
  },
  { timestamps: true }
  );

const Benefits = mongoose.model("Benefits", benefitsSchema);


module.exports = Benefits;