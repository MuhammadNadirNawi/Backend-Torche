const Services = require("../models/services");
const imagekit = require("../../lib/imageKit")


const createServices = async (req, res) => {
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

    const icon = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    })

    const service = await Services.create({
      ...req.body,
      icon: icon.url,
    });
    res.status(200).json({ status: "success", message: "success create services", data: service, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findAllServices = async (req, res) => {
  try {
    const services = await Services.find().lean();
    if(services.length == 0) { 
      return res.status(404).send({ message: "no services found", })
    }
    res.status(200).json({status: "success", message: "success get all services", data: services, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findServicesById = async (req, res) => {
  try {
    const services = await Services.findById(req.params.id);
    if(!services) {
      return res.status(404).send({ message: "services not found", })
    }
    res.status(200).json({status: "success", message: "success get services", data: services, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

module.exports = {
  createServices,
  findAllServices,
  findServicesById,
};
