const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const nameRegexp = /^[\w\s'-]+$/;
const phoneRegexp =/^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

const ContactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().pattern(nameRegexp).messages({
    "string.base": "Name should be a text",
    "string.alphanum": "Name should only contain letters and numbers",
    "string.min": "Name should be at least {#limit} characters long",
    "string.max": "Name should not be more than {#limit} characters long",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a text",
    "string.email": "Enter a valid email",
    "any.required": "Email is a required field",
  }),
  phone: Joi.string().required().pattern(phoneRegexp).messages({
    "string.base": "Phone number should be a text",
    "any.required": "Phone number is a required field",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

const schemas = {
  ContactAddSchema,
  updateFavoriteSchema,
};

module.exports = {
  schemas,
  Contact,
};
