const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
  registerUser: joi
    .object({
      name: joi
        .string()
        .min(2)
        .max(20)
        .messages({
          "string.min": "name should min {#limit} characters",
          "string.max": "name should max {#limit} characters",
        })
        .required(),
      email: joi
        .string()
        .email()
        .message("Provide valid email address")
        .required(),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .message({
          "password.minOfSpecialCharacters":
            "{#label} should contain atleast {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain atleast {#min} lowercase character",
          "password.minOfUppercase":
            "{#label} should contain atleast {#min} uppercase character",
          "password.minOfNumeric":
            "{#label} should contain atleast {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        })
        .required(),
    })
    .unknown(true),

  loginUser: joi.object({
      email: joi
        .string()
        .email()
        .message("Provide vaild email address")
        .required(),
      password: joi.string().required(),
    }),

  resetPass: joi.object({
      newPass: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .message({
        "password.minOfSpecialCharacters":
          "{#label} should contain atleast {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain atleast {#min} lowercase character",
        "password.minOfUppercase":
          "{#label} should contain atleast {#min} uppercase character",
        "password.minOfNumeric":
          "{#label} should contain atleast {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      })
      .required(),
    })
    .unknown(true),
};

module.exports = schema;
