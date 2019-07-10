const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantUserSchema = new Schema(
  {
    name: String,
    description: String,
    picPath: { type: String, default: "/images/default-avatar.png"},
    waterFrequencyInDays: {
      type: Number,
      default: 1
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // _plantFamily: {
    //   type: Schema.Types.ObjectId,
    //   ref: "PlantFamily"
    // },
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
