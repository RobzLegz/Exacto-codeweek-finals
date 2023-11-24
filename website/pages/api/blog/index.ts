import { NextApiRequest, NextApiResponse } from "next";
import { blogCtrl } from "../../../src/controllers/blogCtrl";

const { create, get } = blogCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await create(req, res);
      break;
    case "GET":
      await get(req, res);
      break;
  }
};
