const MethodCourses = require("../models/methodCourse");

const createMethodCourses = async (req, res) => {
  try {
    const newMethodCourse = new MethodCourses(req.body);
   
    const methodCourses = await newMethodCourse.save();
    res
      .status(201)
      .json({
        status: "success",
        message: "success create new method course",
        data: { methodCourses },
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}

const findAllMethodCourses = async (req, res) => {
  try {
    const methodCourses = await MethodCourses.find();
    if (methodCourses.length == 0) {
      return res.status(404).send({ message: "method courses not found", });
    }
    res.status(200).json({
      status: "success",
      message: "success get all method courses",
      data: methodCourses,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findMethodCourseById = async (req, res) => {
  try {
    const methodCourses = await MethodCourses.findById(req.params.id);
    if(!methodCourses) {
      return res.status(404).send({ message: "method course not found", })
    }
    res.status(200).json({status: "success", message: "success get method course", data: tutors, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const updateMethodCourseById = async (req, res) => {
  try {
    const methodCourses = await MethodCourses.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!methodCourses) {
      return res.status(404).send({ message: "method courses not found", })
    }
    res.status(200).json({status: "success", message: "success update method course",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteMethodCourseById = async (req, res) => {
  try {
    const methodCourses = await MethodCourses.findByIdAndDelete(req.params.id);
    if(!methodCourses) {
      return res.status(404).send({ message: "method courses not found", })
    }
    res.status(200).json({ status: "success", message: "method course has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  createMethodCourses,
  findAllMethodCourses,
  findMethodCourseById,
  updateMethodCourseById,
  deleteMethodCourseById,
};