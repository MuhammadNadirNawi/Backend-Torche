const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true,},
    fullName: { type: String, required: true,},
    password: {type: String, required: true,},
    phone: {type: String,},
    university: {type: String,},
    department: {type: String,},
    batch: { type: Number, },
    knowFrom: { type: String, },
    isEmailVerified: { type: Boolean, required: true},
    role: { type: String, required: true},
  },
  { timestamps: true }
  );

const Users = mongoose.model("Users", userSchema);


module.exports = Users;