const Joi = require("@hapi/joi");

export const transactionSchemaValidation = Joi.object({
  nsu: Joi.string()
    .alphanum()
    .required(),

  valor: Joi.number().positive(),

  bandeira: Joi
    .string()
    .valid("VISA", "MASTERCARD")
    .required(),

  modalidade: Joi
    .string()
    .valid("CREDITO", "DEBITO")
    .required(),

  horario: Joi.string()
});
