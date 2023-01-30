import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "../../../util/apiTools";
import UserModel from "../../../models/UserModel";
import connectMongo from "../../../util/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiUserRole = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(requireAuth); // TODO AUTH!
  if (req.method === "PATCH") {
    try {
      await connectMongo();

      const { role } = req.body.role;
      const allowedRoles = ["user", "admin"];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role not allowed" });
      }
      await UserModel.findOneAndUpdate({ _id: req.body.user.sub }, { role });
      res.status(200).json({
        message:
          "User role updated. You must log in again for the changes to take effect.",
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiUserRole;
