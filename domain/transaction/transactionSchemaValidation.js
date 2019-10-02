const Joi = require("@hapi/joi");

export const transactionSchemaValidation = Joi.object({
  nsu: Joi.string()
    .alphanum()
    .required(),

  value: Joi.number().positive(),

  cardBrand: Joi
    .string()
    .valid("VISA", "MASTERCARD")
    .required(),

  type: Joi
    .string()
    .valid("CREDITO", "DEBITO")
    .required(),

  createdAt: Joi.string()
});
