import joi from "joi";
import JoiDateFactory from "@joi/date";

const Joi = joi.extend(JoiDateFactory);

export const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().max(11).min(10),
  cpf: Joi.string().max(11).min(11).required(),
  birthday: Joi.date().format("YYYY-MM-DD").raw().required(),
});
