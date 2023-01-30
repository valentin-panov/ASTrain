import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "../../../util/apiTools";
import UserModel from "../../../models/UserModel";
import connectMongo from "../../../util/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiBio = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(requireAuth); // TODO AUTH!
  if (req.method === "GET") {
    try {
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
