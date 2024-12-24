const validation = require("./playListSchema");

module.exports = {
  addPlaylistValidation: async (req, res, next) => {
    const addPlaylistValues = await validation.addPlaylist.validate(req.body, {
      abortEarly: false,
    });
    if (addPlaylistValues.error) {
      res.status(400).json({
        success: 0,
        error: addPlaylistValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  editPlaylistValidation: async (req, res, next) => {
    const editPlaylistValues = await validation.editPlaylist.validate(req.body, {
      abortEarly: false,
    });
    if (editPlaylistValues.error) {
      res.status(400).json({
        success: 0,
        error: editPlaylistValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  addSongToPlaylistValidation: async (req, res, next) => {
    const addSongValues = await validation.addSongToPlaylist.validate(req.body, {
      abortEarly: false,
    });
    if (addSongValues.error) {
      res.status(400).json({
        success: 0,
        error: addSongValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
