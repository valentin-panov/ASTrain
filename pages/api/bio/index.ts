import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@utils/apiTools";
import UserModel from "../../../models/UserModel";
import connectMongo from "@utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiBio = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.substring(7);
      verifyJWT(token as string);

      await connectMongo();

      const { sub } = req.body.user;
      const user = await UserModel.findOne({
        _id: sub,
      })
        .lean()
        .select("bio");

      return res.status(200).json({
        bio: user?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem updating your bio",
      });
    }
  } else if (req.method === "PATCH") {
    try {
      await connectMongo();

      const { sub } = req.body.user;
      const { bio } = req.body.bio;
      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: sub,
        },
        {
          bio,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "Bio updated!",
        bio: updatedUser?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem updating your bio",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiBio;
