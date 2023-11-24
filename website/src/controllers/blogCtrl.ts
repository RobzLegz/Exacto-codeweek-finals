import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import { getUrl } from "../utils/getUrl";

export const blogCtrl = {
  create: async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, text, image } = req.body;

    const url = await getBlogUrl(title);

    const blog = await prisma.blog.create({
      data: { title, text, image, url },
    });

    res.json(blog);
  },
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { take } = req.query;

    const blogs = await prisma.blog.findMany({
      take: typeof take === "string" ? Number(take) : undefined,
      orderBy: { created_at: "desc" },
    });

    res.json(blogs);
  },
  update: async (req: NextApiRequest, res: NextApiResponse) => {
    const { title: blog_id } = req.query;
    const { title, text, image } = req.body;

    if (!blog_id || typeof blog_id !== "string") {
      return res.status(400).json({ err: "Invalid blog url" });
    }

    const url = await getBlogUrl(title);

    const blog = await prisma.blog.update({
      where: { id: blog_id },
      data: { title, text, image, url },
    });

    res.json(blog);
  },
  getOne: async (req: NextApiRequest, res: NextApiResponse) => {
    const { title: title_url } = req.query;
    if (!title_url || typeof title_url !== "string") {
      return res.status(400).json({ err: "Invalid blog url" });
    }
    console.log(title_url)
    const blog = await prisma.blog.findFirst({
      where: { url: title_url },
    });

    res.json(blog);
  },
  deleteOne: async (req: NextApiRequest, res: NextApiResponse) => {
    const { title: blog_id } = req.query;
    if (!blog_id || typeof blog_id !== "string") {
      return res.status(400).json({ err: "Invalid blog url" });
    }

    await prisma.blog.delete({
      where: { id: blog_id },
    });

    res.json({ msg: "Blog deleted" });
  },
};

const getBlogUrl = async (title: string) => {
  let cleanTitle = title;

  while (cleanTitle.includes("  ")) {
    cleanTitle = cleanTitle.replaceAll("  ", " ");
  }

  if (cleanTitle.startsWith(" ")) {
    cleanTitle = cleanTitle.substring(1);
  }

  if (cleanTitle.endsWith(" ")) {
    cleanTitle = cleanTitle.substring(0, cleanTitle.length - 1);
  }

  const base = getUrl(cleanTitle);
  let url = base;

  let counter = 0;

  let isUnique = await prisma.blog.findFirst({
    where: { url: url },
    select: { id: true },
  });

  while (isUnique !== null) {
    url = `${base}-${counter}`.replaceAll("--", "-");

    isUnique = await prisma.blog.findFirst({
      where: { url: url },
      select: { id: true },
    });

    counter++;
  }

  return url;
};
