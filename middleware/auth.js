const jwt = require("jsonwebtoken")
const Users = require("../app/models/users")


const verifyToken = async(req, res, next) => {
  try {

    const token = req.cookies["acces_token"];
    console.log(token)
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Required header authorization",
      })
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(payload)
    Users.findById(payload._id).then((instance) => {
      req.user = instance
      console.log(req.user)
      next()
    })
  } catch {
    res.status(401).json({
      status: "failed",
      message: "Invalid Token",
    })
  }
}

const authUser = (req, res, next) => {
  if (req.user._id == req.params.id ) {
    next()
  } else {
    res.status(401).json({
      status: "failed",
      message: "unauthorized",
    })
  }
}

const authAdmin = (req, res, next) => {
  if (req.user.role == "admin" ) {
    next()
  } else {
    res.status(401).json({
      status: "failed",
      message: "unauthorized",
    })
  }
}

module.exports = { verifyToken, authUser, authAdmin}