const ReviewCourse = require("../models/reviewCourses");
const Courses = require("../models/courses");
const Users = require("../models/users");


const createReviewCourse = async (req, res) => {
  try {
    const newReviewCourse = new ReviewCourse(req.body);
    const user = await Users.findById(newReviewCourse.idUser);
    const course = await Courses.findById(newReviewCourse.idCourse);
    if (!user) {
      return res.status(404).json({ status: "failed", message: "Users Not Found.", })
    }
    if (!course) {
      return res.status(404).json({ status: "failed", message: "Courses Not Found.", })
    }
    const userReview = await ReviewCourse.findOne({idUser: newReviewCourse.idUser, idCourse: newReviewCourse.idCourse});
    if (userReview) {
      return res.status(404).json({ status: "failed", message: "Users Already Review for the course.", })
    }
    const reviewCourse = await newReviewCourse.save();
    res.status(201).json({
      status: "success",
      message: "success create new review",
      data: { reviewCourse },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}

const findAllReviewCourse = async (req, res) => {
  try {
    const reviewCourses = await reviewCourse.find();
    if (reviewCourses.length == 0) {
      return res.status(404).send({ message: "reviews not found", });
    }
    res.status(200).json({
      status: "success",
      message: "success get all review",
      data: reviewCourses,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewCourseById = async (req, res) => {
  try {
    const reviewCourse = await ReviewCourse.findById(req.params.id);
    if(!reviewCourse) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({
      status: "success",
      message: "success get review",
      data: reviewCourse,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewCourseByUser = async (req, res) => {
  try {
    const user = await Users.findById(req.body.idUser);
    if (!user) {
      return res.status(404).json({ status: "failed", message: "Users Not Found.", })
    }
    const reviewCourse = await ReviewCourse.find({idUser: req.body.idUser});
    if(reviewCourse.length == 0) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({
      status: "success",
      message: "success get review by user",
      data: reviewCourse,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewCourseByCourse = async (req, res) => {
  try {
    const course = await Courses.findById(req.body.idCourse);
    if (!course) {
      return res.status(404).json({ status: "failed", message: "course Not Found.", })
    }
    const reviewCourse = await ReviewCourse.find({idCourse: req.body.idCourse});
    if(reviewCourse.length == 0) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({
      status: "success",
      message: "success get review by tutor",
      data: reviewTutor,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const updateReviewCoursesById = async (req, res) => {
  try {
    const reviewCourse = await ReviewCourse.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!reviewCourse) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({status: "success", message: "success update reviews",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteReviewCoursesById = async (req, res) => {
  try {
    const reviewCourse = await ReviewCourse.findByIdAndDelete(req.params.id);
    if(!reviewCourse) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({ status: "success", message: "reviews has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  createReviewCourse,
  findAllReviewCourse,
  findReviewCourseById,
  findReviewCourseByUser,
  findReviewCourseByCourse,
  updateReviewCoursesById,
  deleteReviewCoursesById,
}