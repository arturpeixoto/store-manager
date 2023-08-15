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

const validateQuantity = (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    if (Number(body[i].quantity) <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  next();
};

module.exports = {
  validateInputsNewSale,
  validateQuantity,
};