const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true,},
    fullName: { type: String, required: true,},
    password: {type: String, required: true,},
    phone: {type: String, required: true,},
    university: {type: String, required: true,},
    department: {type: String, required: true,},
    batch: { type: Number, required: true, },
    knowFrom: { type: String, required: true, },
    isEmailVerified: { type: Boolean, required: true},
    role: { type: String, required: true},
  },
  { timestamps: true }
  );

const Users = mongoose.model("Users", userSchema);


module.exports = Users;