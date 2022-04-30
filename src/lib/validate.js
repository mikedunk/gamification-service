const { optional } = require("joi");
const Joi = require("joi");
const { loginType, status } = require("./enums");

//login schema
const LoginSchema = Joi.object({
  email: Joi.string().min(6).email(),
  phone_number: Joi.string().min(6),
  password: Joi.string().required(),
  loginType: Joi.string().valid(loginType.EMAIL, loginType.PHONE).required(),
});

//new game schema
const NewGameSchema = Joi.object({
  description: Joi.string().min(6),
  durationInDays: Joi.number().required(),
  startDate: Joi.number().required(),
  additional_info: Joi.string().optional(),
  resource_link: Joi.string().optional(),
  status: Joi.string().valid(status.ACTIVE, status.INACTIVE).optional(),
});

//new game schema
const UpdateGameSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().min(6).optional(),
  startDate: Joi.number().optional(),
  durationInDays: Joi.number().when("startDate", {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  additional_info: Joi.string().optional(),
  resource_link: Joi.string().optional(),
  status: Joi.string().valid(status.ACTIVE, status.INACTIVE).optional(),
});

const NewSubGameSchema = Joi.object({
  description: Joi.string().min(6).required(),
  durationInDays: Joi.number().required(),
  endDate: Joi.number().optional(),
  additional_info: Joi.string().optional(),
  resource_link: Joi.string().optional(),
  status: Joi.string().valid(status.ACTIVE, status.INACTIVE).optional(),
});

const UpdateSubGameSchema = Joi.object({
  game_id: Joi.number().required(),
  description: Joi.string().min(6).optional(),
  endDate: Joi.number().optional(),
  additional_info: Joi.string().optional(),
  resource_link: Joi.string().optional(),
  status: Joi.string().valid(status.ACTIVE, status.INACTIVE).optional(),
});
//user registration schema
const RegistrationSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("confirm password and password")
    .messages({ "any.only": "{{#label}} do not match" }),

  first_name: Joi.string().required(),

  last_name: Joi.string().required(),

  phone_number: Joi.string().required(),
});

module.exports = {
  RegistrationSchema,
  LoginSchema,
  NewGameSchema,
  UpdateGameSchema,
  NewSubGameSchema,
  UpdateSubGameSchema,
};
