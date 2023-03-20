const RegisterCourses = require("../models/registerCourse");

const createRegisterCourses = async (req, res) => {
  try {
    const newRegisterCourse = new RegisterCourses(req.body);
   
    const registerCourses = await newRegisterCourse.save();
    res
      .status(201)
      .json({
        status: "success",
        message: "success create new register course",
        data: { registerCourses },
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}

const findAllRegisterCourses = async (req, res) => {
  try {
    const registerCourses = await RegisterCourses.find();
    if (registerCourses.length == 0) {
      return res.status(404).send({ message: "register courses not found", });
    }
    res.status(200).json({
      status: "success",
      message: "success get all register courses",
      data: registerCourses,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findRegisterCourseById = async (req, res) => {
  try {
    const registerCourses = await RegisterCourses.findById(req.params.id);
    if(!registerCourses) {
      return res.status(404).send({ message: "register course not found", })
    }
    res.status(200).json({status: "success", message: "success get register course", data: registerCourses, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteRegisterCourseById = async (req, res) => {
  try {
    const registerCourses = await RegisterCourses.findByIdAndDelete(req.params.id);
    if(!registerCourses) {
      return res.status(404).send({ message: "register courses not found", })
    }
    res.status(200).json({ status: "success", message: "register course has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  createRegisterCourses,
  findAllRegisterCourses,
  findRegisterCourseById,
  deleteRegisterCourseById,
};
