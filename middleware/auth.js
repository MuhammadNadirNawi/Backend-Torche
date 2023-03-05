const jwt = require("jsonwebtoken")
const { Users, } = require("../app/models/users")


const authUser = async(req, res, next) => {
  try {

    const token = req.cookies["acces_token"];
    console.log(token)
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Required header authorization",
      })
    }
  
    // const bearerToken = req.headers.authorization
    // const token = bearerToken.split("Bearer ")[1]
    // if (!token) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "Required header authorization",
    //   })
    // }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(payload)
    Users.findById(payload._id).then((instance) => {
      req.user = instance
      next()
    })
  } catch {
    res.status(401).json({
      status: "failed",
      message: "Invalid Token",
    })
  }
}

module.exports = { authUser, }