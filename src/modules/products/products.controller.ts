import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productModel } from "./products.model";
import { productService } from "./products.service";

//  Controller for Create a Product
const createProductController = catchAsync(async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await productService.createProduct(req.body);
    console.log(result, " THis is the resutl");
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Products",
      data: result,
    });
  } catch (error) {
    throw new Error("You have Errors");
  }
});
// Controller for get all Product
const getProductsController = catchAsync(async (req, res, next) => {
  try {
    const result = await productService.getAllProducts();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    throw new Error("You have Errors");
  }
});

// Controller For get Featured Products
const getFeaturedProductsController = catchAsync(async (req, res, next) => {
  try {
    const result = await productService.getFeaturedProduct();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Featured Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    throw new Error("You have Errors");
  }
});
//  Controller for updating product id

export const productController = {
  createProductController,
  getProductsController,
  getFeaturedProductsController,
};
