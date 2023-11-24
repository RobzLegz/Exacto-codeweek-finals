import { NextApiRequest, NextApiResponse } from "next";
import { blogCtrl } from "../../../src/controllers/blogCtrl";

const { update, getOne, deleteOne } = blogCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PUT":
      await update(req, res);
      break;
    case "GET":
      await getOne(req, res);
      break;
    case "DELETE":
      await deleteOne(req, res);
      break;
  }
};
