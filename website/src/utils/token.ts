import jwt from "jsonwebtoken";

export const createAccessToken = (payload: any) => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  }
};
