const checkRequiredFields = require('../utils/checkRequiredFields');

const validateInputsNewSale = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['productId', 'quantity'];
  for (let i = 0; i < body.length; i += 1) {
    const productError = checkRequiredFields(body[i], requiredFields);
    if (productError) return res.status(400).json({ message: productError });
  }

  next();
};

const validateUpdateSalesProductsField = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['quantity'];
  const updateError = checkRequiredFields(body, requiredFields);
  if (updateError) return res.status(400).json({ message: updateError });

  next();
};

const validateQuantity = (req, res, next) => {
  const { body } = req;

  const isValidQuantity = (item) => Number(item.quantity) > 0;

  const isArrayWithValidQuantities = Array.isArray(body) && body.every(isValidQuantity);
  const isSingleItemWithValidQuantity = !Array.isArray(body) && isValidQuantity(body);

  if (isArrayWithValidQuantities || isSingleItemWithValidQuantity) {
    next();
  } else {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
};

module.exports = {
  validateInputsNewSale,
  validateQuantity,
  validateUpdateSalesProductsField,
};