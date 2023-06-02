const productService = require("../services/products.service");
const HTTP_STATUS = require("http-status");

 //for fetching all the products 
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts()
   return res.status(HTTP_STATUS.OK).json({ message: "Data fetched successfully" ,products});
  } catch (error) {
    next(error);
  }
};
