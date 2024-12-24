const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");
const playlistValidation = require("../validation/playlist/playListvalidation");

router.post(
  "/playlist",
  authMiddleware,
  playlistValidation.addPlaylistValidation,
  playlistController.addPlaylist
);

router.put(
  "/playlist/:id",
  authMiddleware,
  playlistValidation.editPlaylistValidation,
  playlistController.updatePlaylist
);

router.post(
  "/playlist/:id/songs",
  authMiddleware,
  playlistValidation.addSongToPlaylistValidation,
  playlistController.addSongToPlaylist
);

router.delete(
  "/playlist/:id",
  authMiddleware,
  playlistController.deletePlaylist
);
router.get(
    "/playlist/:id",
    authMiddleware,
    playlistController.getPlaylistById
  );
router.delete(
    "/playlist/:id/song/:songId",
    authMiddleware,
    playlistController.removeSongFromPlaylist
  );
router.get("/playlist", authMiddleware, playlistController.getAllPlaylists);

module.exports = router;
