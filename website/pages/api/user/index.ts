import { NextApiRequest, NextApiResponse } from "next";
import { userCtrl } from "../../../src/controllers/userCtrl";

const { checkAuth } = userCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await checkAuth(req, res);
      break;
  }
};
