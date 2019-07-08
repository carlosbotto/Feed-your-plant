const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantUserSchema = new Schema(
  {
    name: String,
    description: String,
    picPath: 
    { type: String,
      //required: true
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
