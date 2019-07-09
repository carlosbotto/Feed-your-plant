const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantFamilySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    picPath: { type: String, required: true },
    description: { type: String, required: true },
    waterFrequencyInDays: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const PlantFamily = mongoose.model("PlantFamily", plantFamilySchema);
module.exports = PlantFamily;