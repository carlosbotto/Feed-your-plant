// This model is used only if we upload with Multer
// Since we are using Cloudinary, it is not used
// But we keep it :)

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  name: String,
  path: String,
  originalName: String

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;