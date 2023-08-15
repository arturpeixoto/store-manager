const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const productNameSchema = Joi.object({
  name: nameSchema,
});

module.exports = {
  productNameSchema,
};