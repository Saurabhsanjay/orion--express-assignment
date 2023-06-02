const Product=require('../models/product.model')

async function getAllProducts(offset, limit) {
  try {
    const products = await Product.find().skip(offset).limit(limit);
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
}

module.exports = {
  getAllProducts,
};
