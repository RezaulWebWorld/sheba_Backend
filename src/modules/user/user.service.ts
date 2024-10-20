import { TUser, TLogin } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserDb = async (payload: TUser) => {
  const userEmail = await User.findOne({ email: payload.email });
  if (userEmail) {
    throw new Error("Oops! User is already Exits");
  }
  const result = await User.create(payload);
  return result;
};

const userLogin = async (payload: TLogin) => {
  const userData = await User.findOne({ email: payload.email });
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new Error("Oops! Email is not in our Database, please register!!!");
  }

  if (payload.password !== user.password) {
    throw new Error("Oops! Password is not Correct!!!");
  }
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  };
  console.log(jwtPayload);
  const token = jwt.sign(jwtPayload, config.json_web_token as string, {
    expiresIn: config.token_expire,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.refresh_web_token as string,
    { expiresIn: config.expire_refresh_token }
  );
  return { userData, token, refreshToken };
};

export const UserServices = {
  createUserDb,
  userLogin,
};
