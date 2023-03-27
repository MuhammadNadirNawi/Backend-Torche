const Benefits = require("../models/benefits");
const imagekit = require("../../lib/imageKit")


const createBenefits = async (req, res) => {
  try {
    const file = req.file

    const validFormat = file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/webp"
    if (!validFormat) {
      return res.status(400).json({
        status: "failed",
        message: "Wrong Image Format",
      })
    }

    const split = file.originalname.split(".")
    const ext = split[split.length - 1]

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    })

    const benefit = await Benefits.create({
      ...req.body,
      image: img.url,
    });
    res.status(200).json({ status: "success", message: "success create Benefits", data: benefit, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findAllBenefits = async (req, res) => {
  try {
    const benefits = await Benefits.find().lean();
    if(Benefits.length == 0) { 
      return res.status(404).send({ message: "no Benefits found", })
    }
    res.status(200).json({status: "success", message: "success get all Benefits", data: benefits, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findBenefitsById = async (req, res) => {
  try {
    const benefit = await Benefits.findById(req.params.id);
    if(!Benefits) {
      return res.status(404).send({ message: "Benefits not found", })
    }
    res.status(200).json({status: "success", message: "success get Benefits", data: benefit, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

module.exports = {
  createBenefits,
  findAllBenefits,
  findBenefitsById,
};
