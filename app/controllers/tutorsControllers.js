const Tutors = require("../models/tutors");

const createTutors = async (req, res) => {
  try {

    const newTutor = new Tutors(req.body)
    const tutor = await Tutors.findOne({ tutorName: newTutor.tutorName });
    if (tutor) {
      return res.status(400).json({ status: "failed", message: "Tutor already exist.", })
    }
    const tutors = await newTutor.save();
    res.status(201).json({status: "success", message: "success create new mentor", data: {tutors},});
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const findAllTutors = async (req, res) => {
  try {
    const tutors = await Tutors.find().lean().select({tutorName: 1, specialist: 1, socialMedia: 1, education: 1, image: 1});
    if(tutors.length == 0) { 
      return res.status(404).send({ message: "no tutors found", })
    }
    res.status(200).json({status: "success", message: "success get all tutors", data: tutors, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findTutorsById = async (req, res) => {
  try {
    const tutors = await Tutors.findById(req.params.id);
    if(!tutors) {
      return res.status(404).send({ message: "tutors not found", })
    }
    res.status(200).json({status: "success", message: "success get tutor", data: tutors, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const updateTutorsById = async (req, res) => {
  try {
    const tutors = await Tutors.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!tutors) {
      return res.status(404).send({ message: "tutors not found", })
    }
    res.status(200).json({status: "success", message: "success update tutors",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteTutorsById = async (req, res) => {
  try {
    const tutors = await Tutors.findByIdAndDelete(req.params.id);
    if(!tutors) {
      return res.status(404).send({ message: "tutors not found", })
    }
    res.status(200).json({ status: "success", message: "tutors has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

module.exports = {
  createTutors,
  findAllTutors,
  findTutorsById,
  updateTutorsById,
  deleteTutorsById,
}