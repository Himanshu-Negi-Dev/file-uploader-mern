const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
   },

   image: {
      type: String,
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Post = mongoose.model("Post", PostSchema);
