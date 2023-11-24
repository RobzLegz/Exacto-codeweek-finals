import { NextApiRequest, NextApiResponse } from "next";
import { messageCtrl } from "../../../src/controllers/messageCtrl";

const { create } = messageCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await create(req, res);
      break;
  }
};
