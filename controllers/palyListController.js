const Playlist = require('../models/playListModelSchema');

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: playlists, message: "Playlist fetch successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch playlists" });
  }
};

// Add a new playlist
const addPlaylist = async (req, res) => {
  const { name, songs } = req.body;
  try {
    const playlist = new Playlist({ name, songs, userId: req.user.id });
    await playlist.save();
    res.status(201).json({ success: true, data: playlist, message: "Playlist added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create playlist" });
  }
};

// Update a playlist
const updatePlaylist = async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedPlaylist) {
      return res.status(404).json({ success: false, error: "Playlist not found" });
    }
    res.json({ success: true, data: updatedPlaylist, message: "Playlist updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update playlist" });
  }
};

// Delete a playlist
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user.id });

    if (!playlist) {
      return res.status(404).json({ success: false, error: "Playlist not found" });
    }

    await playlist.remove();
    res.json({ success: true, message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete playlist" });
  }
};

// Get a playlist by ID
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user.id });

    if (!playlist) {
      return res.status(404).json({ success: false, error: "Playlist not found" });
    }

    res.json({ success: true, data: playlist, message: "Playlist fetch successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch playlist" });
  }
};

// Add a song to a playlist
const addSongToPlaylist = async (req, res) => {
  const { songId, title, artist, album, duration } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user.id });

    if (!playlist) {
      return res.status(404).json({ success: false, error: "Playlist not found" });
    }

    const newSong = { songId, title, artist, album, duration };
    playlist.songs.push(newSong);

    await playlist.save();
    res.json({ success: true, data: playlist, message: "Song added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add song to playlist" });
  }
};

// Remove a song from a playlist
const removeSongFromPlaylist = async (req, res) => {
  const { id, songId } = req.params;

  try {
    const playlist = await Playlist.findOne({ _id: id, userId: req.user.id });

    if (!playlist) {
      return res.status(404).json({ success: false, error: "Playlist not found" });
    }

    // Remove the song from the playlist's songs array
    playlist.songs = playlist.songs.filter((song) => song._id.toString() !== songId);

    await playlist.save();

    res.json({ success: true, message: "Song removed successfully", data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to remove song from playlist" });
  }
};

module.exports = {
  deletePlaylist,
  updatePlaylist,
  addPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  getPlaylistById,
  removeSongFromPlaylist
};
