const Users = require("../models/users");
const Verify = require("../models/verify");
const bcrypt = require("bcrypt")
const { v4: uuidv4, } = require("uuid")
const tokenVerify = uuidv4()
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const handlebars = require("handlebars")
const secretKey = process.env.ACCESS_TOKEN_SECRET || "This is a secret key"
const { sendMail,}= require("../../lib/sendEmail")


const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email

    const emailUser = await Users.findOne({email: email, })

    if (emailUser) {
      return res.status(400).json({ status: "failed", message: "Email already exist", })
    } 

    const newUser = new Users({
      ...req.body,
      password: hash,
      isEmailVerified: false,
      role: "user",
    });
    await newUser.save();
  
    const date = Date.now() + 1000 * 60 * 60 * 24
    const token = `${tokenVerify}${Date.now()}`

    const newVerify = new Verify({
      idUser: newUser._id,
      tokenVerify: token,
      expiredAt: date,
    });
    await newVerify.save();

    const url = `http://localhost:8000/?token=${token}`
    const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../views/verification.hbs"), "utf8")
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({email, url, })
    const data = {
      EMAIL: email,
      subject: "Email Verification",
      text: "hello word",
      html : htmlToSend,
    }
    sendMail(data)

    res.status(200).json({status: "success", message: "Register success", data: { newUser, },});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};


const verified = async (req, res) => {
  try {
    const { token, } = req.body
    const checkToken = await Verify.findOne({tokenVerify: token, })
    const ExpiredDate = checkToken.expiredAt
    const dateNow = Date.now()
    if (dateNow >= ExpiredDate) {
      return res.status(400).json({ status: "failed", message: "expired token", })
    }
    const userVerify = await Users.findByIdAndUpdate(
      checkToken.idUser,
      { $set: { isEmailVerified: true, } },
      { new: true }
    )
    res.status(200).json({
      message: "Your account has been successfully verified.",
      userVerify: userVerify.isEmailVerified,
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}


const createToken = (payload) => jwt.sign(payload, secretKey, { expiresIn: "24h",})

const signin = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User Not found.", })
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password)

    if (!passwordIsValid) {
      res.status(401).json({ status: "failed", message: "Invalid Password", })
      return
    }

    const verifikasi = user.isEmailVerified
    if (!verifikasi) {
      return res.status(401).json({ status: "failed", message: "Account Not Verified", })
    }

    const { _id, fullName, email, password, university, phone, department, batch, knowFrom, role} = user

    const token = createToken({
      _id,
      fullName,
      email,
      password,
      university,
      phone,
      department,
      batch,
      knowFrom,
      role,
    })
    res.cookie("access_token", token, {
      httpOnly: true,  
    }).status(200).json({ status: "success", message: "Login successfully", data: user, token, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

module.exports = {
  register,
  signin,
  verified,
};
