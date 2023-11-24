import { NextApiRequest, NextApiResponse } from "next";
import { userCtrl } from "../../../src/controllers/userCtrl";

const { login } = userCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};
