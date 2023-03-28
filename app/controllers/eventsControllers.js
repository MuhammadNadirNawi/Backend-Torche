const Events = require("../models/events");
const imagekit = require("../../lib/imageKit")

const createEvents = async (req, res) => {
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

    const event = await Events.create({
      ...req.body,
      image: img.url,
    });
    res.status(200).json({ status: "success", message: "success create events", data: event, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findAllEvents = async (req, res) => {
  try {
    const events = await Events.find().sort({createdAt: -1}).select({speakers:0, documentation:0, price:0});
    if(events.length == 0) { 
      return res.status(404).send({ message: "no events found", })
    }
    res.status(200).json({status: "success", message: "success get all events", data: events, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const findEventsById = async (req, res) => {
  try {
    const events = await Events.findById(req.params.id);
    if(!events) {
      return res.status(404).send({ message: "events not found", })
    }
    res.status(200).json({status: "success", message: "success get events", data: events, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}

const updateEventsById = async (req, res) => {
  try {
    const events = await Events.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if(!events) {
      return res.status(404).send({ message: "events not found", })
    }
    res.status(200).json({status: "success", message: "success update events",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const deleteEventsById = async (req, res) => {
  try {
    const events = await Events.findByIdAndDelete(req.params.id);
    if(!events) {
      return res.status(404).send({ message: "events not found", })
    }
    res.status(200).json({ status: "success", message: "events has been deleted."});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
};

const searchingEvents = async (req, res) => {

  const searchTitle = req.query.title || "";
  const searchType = req.query.typeEvent || "";

  let sortBy = {createdAt: -1};
  if (req.query.sortByDate != undefined) {
    if (req.query.sortByDate == "asc") {
      sortBy = { createdAt: 1 }
    } 
    else if (req.query.sortByDate == "desc") {
      sortBy = { createdAt: -1 }
    }
  }
  else if (req.query.sortByName != undefined) {
    if (req.query.sortByName == "asc") {
      sortBy = { title: 1 }
    }
    else if (req.query.sortByName == "desc") {
      sortBy = { title: -1 }
    }
  }

  try {
    const events = await Events.find({title: {$regex: searchTitle, $options: 'i',}, typeEvent: {$regex: searchType, $options: 'i',}, }).sort(sortBy).select({speakers:0, documentation:0, price:0});
    if(events.length == 0) {
      return res.status(404).send({ message: "events not found", })
    }
    res.status(200).json({status: "success", message: "success get events", data: events, });
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}


module.exports = {
  createEvents,
  findAllEvents,
  findEventsById,
  updateEventsById,
  deleteEventsById,
  searchingEvents,
}
