const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  songs: [
    {
      songId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      artist: {
        type: String,
        required: true,
      },
      album: {
        type: String,
      },
      duration: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

playlistSchema.set("timestamps", true);
module.exports = mongoose.model("playlist", playlistSchema);
