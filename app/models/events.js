const mongoose = require("mongoose");

const speakersSchema = new mongoose.Schema({
  name: { type: String,  },
  description: { type: String, },
  imageSpeaker: { type: String, },
  });

const documentationSchema = new mongoose.Schema({
  imageDoc: { type: String,},
  });

const eventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true,},
    dateStart: { type: String, required: true,},
    dateEnd: { type: String, required: true,},
    time: { type: String, required: true,},
    speakers: [speakersSchema],
    link: { type: String, },
    active: { type: Boolean, default: false},
    typeEvent: { type: String, required: true,},
    documentation: [documentationSchema],
    price: { type: String, required: true,},
    // tambahin foto dokumentasi
  },
  { timestamps: true }
  );

const Events  = mongoose.model("Events", eventsSchema);

module.exports = Events;