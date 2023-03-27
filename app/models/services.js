const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    nameService: { type: String, required: true,},
    description: { type: String, required: true,},
    icon: { type: String, required: true,},
  },
  { timestamps: true }
  );

const Services = mongoose.model("Services", serviceSchema);


module.exports = Services;