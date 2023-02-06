import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@utils/apiTools";
import UserModel from "../../../models/UserModel";
import connectMongo from "@utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiUserRole = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const token = req.headers.authorization?.substring(7);
      const userInfo = requireAuth(token as string);

      const allowedRoles = ["user", "admin"];
      const { role } = req.body;

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role not allowed" });
      }
      await connectMongo();

      await UserModel.findOneAndUpdate({ _id: userInfo.sub }, { role });
      res.status(200).json({
        message:
          "User role updated. You must log in again for the changes to take effect.",
      });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiUserRole;
