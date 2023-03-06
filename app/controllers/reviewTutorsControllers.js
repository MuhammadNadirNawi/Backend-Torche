const ReviewTutor = require("../models/reviewTutors");

const createReviewTutor = async (req, res) => {
  try {
    const newReviewTutor = new ReviewTutor(req.body);
    const reviewTutor = await newReviewTutor.save();
    res.status(201).json({
      status: "success",
      message: "success create new review",
      data: { reviewTutor },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
}

const findAllReviewTutor = async (req, res) => {
  try {
    const reviewTutors = await ReviewTutor.find();
    if (reviewTutors.length == 0) {
      return res.status(404).send({ message: "reviews not found", });
    }
    res.status(200).json({
      status: "success",
      message: "success get all review",
      data: reviewTutors,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewTutorById = async (req, res) => {
  try {
    const reviewTutor = await ReviewTutor.findById(req.params.id);
    if(!reviewTutor) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({
      status: "success",
      message: "success get review",
      data: reviewTutor,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewTutorByUser = async (req, res) => {
  try {
    const reviewTutor = await ReviewTutor.find({idUser: req.body.idUser});
    if(!reviewTutor) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({
      status: "success",
      message: "success get review by user",
      data: reviewTutor,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, });
  }
}

const findReviewTutorByTutor = async (req, res) => {
  try {
    const reviewTutor = await ReviewTutor.find({idTutor: req.body.idTutor});
    if(!reviewTutor) {
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

const updateReviewTutorsById = async (req, res) => {
  try {
    const reviewTutor = await ReviewTutor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!reviewTutor) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({status: "success", message: "success update reviews",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteReviewTutorsById = async (req, res) => {
  try {
    const reviewTutor = await ReviewTutor.findByIdAndDelete(req.params.id);
    if(!reviewTutor) {
      return res.status(404).send({ message: "reviews not found", })
    }
    res.status(200).json({ status: "success", message: "reviews has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  createReviewTutor,
  findAllReviewTutor,
  findReviewTutorById,
  findReviewTutorByUser,
  findReviewTutorByTutor,
  updateReviewTutorsById,
  deleteReviewTutorsById,
}