const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: false },
    price: { type: Number, required: false },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);

module.exports = Property;
