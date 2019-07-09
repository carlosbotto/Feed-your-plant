const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantUserSchema = new Schema(
  {
    name: String,
    description: String,
    picPath: String,
    waterFrequencyInDays: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 15, 30],
      default: 1
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    _plant: {
      type: Schema.Types.ObjectId,
      ref: "Plant"
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const PlantUser = mongoose.model("PlantUser", plantUserSchema);
module.exports = PlantUser;
