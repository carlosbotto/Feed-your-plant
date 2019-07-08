const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    waterFrquencyInDays: Number,
    picPath: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Decoration", "Fruits/Vegetables"]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Plant = mongoose.model("Plant", userSchema);
module.exports = Plant;
