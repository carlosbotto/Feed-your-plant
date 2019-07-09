const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    picPath: { type: String, required: true },
    description: { type: String, required: true },
    waterFrequencyInDays: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 15, 30] 
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
