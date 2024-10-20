import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import { auth } from "../../middleware/authorization";
import { USER_ROLE } from "./user.constans";
import { authentication } from "../../middleware/authentication";

const userRouter = express.Router();

userRouter.post(
  "/register",
  authentication(USER_ROLE.admin),
  userController.userRegistration
);
userRouter.post("/login", userController.userLogin);

export default userRouter;
