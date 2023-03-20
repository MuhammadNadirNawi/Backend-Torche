const Users = require("../models/users");
const bcrypt = require("bcrypt")


const findAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if(users.length == 0) { 
      return res.status(404).send({ message: "no users found", })
    }
    res.status(200).json({status: "success", message: "success get all users", data: users, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findUsersById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if(!user) {
      return res.status(404).send({ message: "users not found", })
    }
    res.status(200).json({status: "success", message: "success get user", data: user, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const updateUsersById = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body, password: hash,} },
      { new: true }
    );
    if(!user) {
      return res.status(404).send({ message: "users not found", })
    }
    res.status(200).json({status: "success", message: "success update users",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const FirstLoginUserById = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body,} },
      { new: true }
    );
    if(!user) {
      return res.status(404).send({ message: "users not found", })
    }
    res.status(200).json({status: "success", message: "success update users",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteUsersById = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if(!user) {
      return res.status(404).send({ message: "user not found", })
    }
    res.status(200).json({ status: "success", message: "users has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  findAllUsers,
  findUsersById,
  updateUsersById,
  FirstLoginUserById,
  deleteUsersById,
}