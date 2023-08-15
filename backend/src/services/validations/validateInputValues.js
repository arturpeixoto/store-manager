const { productNameSchema } = require('./schemas');

const validateProductName = (productName) => {
  const { error } = productNameSchema.validate(productName);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateProductName, 
};