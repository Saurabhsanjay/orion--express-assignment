const Product=require('../models/product.model')

//getall product service logic
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

module.exports = {
  getAllProducts,
};
