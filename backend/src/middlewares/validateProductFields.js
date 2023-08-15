const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProductFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['name'];

  const productError = checkRequiredFields(body, requiredFields);
  if (productError) return res.status(400).json({ message: productError });

  next();
};

module.exports = validateProductFields;