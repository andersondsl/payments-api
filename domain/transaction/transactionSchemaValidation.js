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

export const validateTransaction = async (data) => {
  try {
    await Joi.assert(
      {
        nsu: data.nsu,
        valor: data.valor,
        bandeira: data.bandeira,
        modalidade: data.modalidade,
        horario: data.horario
      },
      transactionSchemaValidation
    );
    return;
  } catch (error) {
    return error;
  }
}