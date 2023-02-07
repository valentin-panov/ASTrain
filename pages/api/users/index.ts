import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../models/UserModel";
import connectMongo from "@utils/connectMongo";
import IUser from "../../../interfaces/IUser";
import { verifyToken } from "@lib/auth";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.substring(7);
      const userInfo = await verifyToken(token as string);
      const { role } = userInfo as unknown as IUser;
      if (role === "admin") {
        await connectMongo();

        const users = await UserModel.find()
          .lean()
          .select("_id firstName lastName avatar bio");

        return res.status(200).json({
          users,
        });
      } else {
        return res.status(401).json({ message: "Something went wrong." });
      }
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem getting the users",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiUsers;
