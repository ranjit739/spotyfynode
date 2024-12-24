const joi = require("joi");

const schema = {
  addPlaylist: joi.object({
    name: joi
      .string()
      .min(2)
      .max(100)
      .messages({
        "string.min": "Playlist name should have a minimum of {#limit} characters",
        "string.max": "Playlist name should have a maximum of {#limit} characters",
      })
      .required(),
    description: joi
      .string()
      .max(500)
      .messages({
        "string.max": "Description should have a maximum of {#limit} characters",
      })
      .optional(),
    songs: joi
      .array()
      .items(
        joi.object({
          songId: joi.string().required().messages({
            "string.empty": "Song ID is required",
          }),
          title: joi.string().required().messages({
            "string.empty": "Song title is required",
          }),
          artist: joi.string().required().messages({
            "string.empty": "Artist name is required",
          }),
          album: joi.string().optional(),
          duration: joi.number().optional().messages({
            "number.base": "Duration should be a number",
          }),
        })
      )
      .messages({
        "array.base": "Songs should be an array",
      })
      .optional(),
  }).unknown(true),

  editPlaylist: joi.object({
    name: joi
      .string()
      .min(2)
      .max(100)
      .messages({
        "string.min": "Playlist name should have a minimum of {#limit} characters",
        "string.max": "Playlist name should have a maximum of {#limit} characters",
      }),
    description: joi
      .string()
      .max(500)
      .messages({
        "string.max": "Description should have a maximum of {#limit} characters",
      }),
    songs: joi
      .array()
      .items(
        joi.object({
          songId: joi.string().required().messages({
            "string.empty": "Song ID is required",
          }),
          title: joi.string().required().messages({
            "string.empty": "Song title is required",
          }),
          artist: joi.string().required().messages({
            "string.empty": "Artist name is required",
          }),
          album: joi.string().optional(),
          duration: joi.number().optional().messages({
            "number.base": "Duration should be a number",
          }),
        })
      )
      .messages({
        "array.base": "Songs should be an array",
      })
      .optional(),
  }).unknown(true),

  addSongToPlaylist: joi.object({
    songId: joi.string().required().messages({
      "string.empty": "Song ID is required",
    }),
    title: joi.string().required().messages({
      "string.empty": "Song title is required",
    }),
    artist: joi.string().required().messages({
      "string.empty": "Artist name is required",
    }),
    album: joi.string().optional(),
    duration: joi.number().optional().messages({
      "number.base": "Duration should be a number",
    }),
  }).unknown(true),
};

module.exports = schema;
