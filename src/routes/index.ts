import { Router } from "express";
import { productRouter } from "../modules/products/products.route";
import userRouter from "../modules/user/user.route";

const routes = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
];

moduleRoutes.forEach((router) => routes.use(router.path, router.route));

export default routes;
