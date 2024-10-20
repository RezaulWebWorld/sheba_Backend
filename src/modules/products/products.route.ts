import express from "express";
import { productController } from "./products.controller";
import { auth } from "../../middleware/authorization";
import { USER_ROLE } from "./user.constans";

const productRouter = express.Router();

// Routers for Mechanical KeyBoard Backend

productRouter.post(
  "/",
  auth(USER_ROLE.user),
  productController.createProductController
);
productRouter.get(
  "/",
  auth(USER_ROLE.admin),
  productController.getProductsController
);
productRouter.get(
  "/products",
  auth(USER_ROLE.user),
  productController.getFeaturedProductsController
); /// for Getting Single Product in the home Page

export { productRouter };
