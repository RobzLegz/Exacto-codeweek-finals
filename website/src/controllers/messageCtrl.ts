import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";

export const messageCtrl = {
  create: async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, message } = req.body;

    await prisma.message.create({
      data: { name, email, message },
    });

    res.json({ msg: "Ziņa nosūtīta" });
  },
};
