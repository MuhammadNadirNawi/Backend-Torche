const Courses = require("../models/courses");

const createCourses = async (req, res) => {
  try {
    const course = await Courses.create(req.body);
    res.status(200).json({ status: "success", message: "success create courses", data: course, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    if(courses.length == 0) { 
      return res.status(404).send({ message: "no courses found", })
    }
    res.status(200).json({status: "success", message: "success get all courses", data: courses, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findCoursesById = async (req, res) => {
  try {
    const courses = await Courses.findById(req.params.id);
    if(!courses) {
      return res.status(404).send({ message: "courses not found", })
    }
    res.status(200).json({status: "success", message: "success get courses", data: courses, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const updateCoursesById = async (req, res) => {
  try {
    const courses = await Courses.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!courses) {
      return res.status(404).send({ message: "courses not found", })
    }
    res.status(200).json({status: "success", message: "success update courses",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteCoursesById = async (req, res) => {
  try {
    const courses = await Courses.findByIdAndDelete(req.params.id);
    if(!courses) {
      return res.status(404).send({ message: "courses not found", })
    }
    res.status(200).json({ status: "success", message: "courses has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = { 
  createCourses,
  findAllCourses,
  findCoursesById,
  updateCoursesById,
  deleteCoursesById,
}