import { NextApiRequest, NextApiResponse } from "next";
import { userCtrl } from "../../../src/controllers/userCtrl";

const { register } = userCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};
