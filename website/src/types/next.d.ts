import { User } from "@prisma/client";
import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest extends NextApiRequest {
    user?: User;
  }
}
