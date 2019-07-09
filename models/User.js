const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    status: {
      type: String,
      enum: ["Noobie", "Green thumb", "Plant lover"]
    }
    // created: { 
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
    timestamps: {
      createdAt: "created_at", 
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
