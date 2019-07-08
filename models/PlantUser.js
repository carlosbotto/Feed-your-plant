const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantUserSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    _plant: {
      type: Schema.Types.ObjectId,
      ref: "Plant"
    }
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const PlantUser = mongoose.model("PlantUser", userSchema);
module.exports = PlantUser;
