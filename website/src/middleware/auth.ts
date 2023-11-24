import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || ""; // Replace with your actual secret key

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token; // Get the token from the cookie (cookie-parser middleware required)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user || user.role < 1) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user object to the request for use in the route handlers
    req.user = user;
    return user;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
