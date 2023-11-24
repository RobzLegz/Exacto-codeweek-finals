import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/token";
import { serialize } from "cookie"; // Import the `cookie` library
import jwt, { JwtPayload } from "jsonwebtoken";
import auth from "../middleware/auth";

export const userCtrl = {
  register: async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of bcrypt rounds

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = createAccessToken({ id: user.id });

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true, // This prevents JavaScript access to the cookie
          sameSite: "strict", // You can adjust this setting based on your requirements
          path: "/", // Specify the path for the cookie
          maxAge: 7 * 24 * 60 * 60, // Cookie expiration time in seconds (adjust as needed)
        })
      );

      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    // Authenticate the user
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate and send a token for successful login (implement your token generation logic)
    const token = createAccessToken({ id: user.id });

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true, // This prevents JavaScript access to the cookie
        sameSite: "strict", // You can adjust this setting based on your requirements
        path: "/", // Specify the path for the cookie
        maxAge: 7 * 24 * 60 * 60, // Cookie expiration time in seconds (adjust as needed)
      })
    );

    return res.status(200).json({ user });
  },
  checkAuth: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await auth(req, res);

      if (!user) {
        return;
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
};
