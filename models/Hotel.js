const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    costPerNight: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    propertyImage: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
