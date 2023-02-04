import { NextApiRequest, NextApiResponse } from "next";
import { createToken, verifyPassword } from "../../../util/apiTools";
import jwtDecode, { JwtPayload } from "jwt-decode";
import connectMongo from "../../../util/connectMongo";
import UserModel from "../../../models/UserModel";
import IUser from "../../../interfaces/IUser";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      await connectMongo();

      const user: IUser = await UserModel.findOne({
        email,
      }).lean();

      if (!user) {
        return res.status(403).json({
          message: "Wrong email or password.",
        });
      }

      const passwordValid = await verifyPassword(
        password,
        user.password as string
      );

      if (passwordValid) {
        const { password, bio, avatar, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = createToken(userInfo);

        const decodedToken: JwtPayload = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.status(200).json({
          message: "Authentication successful!",
          token,
          userInfo,
          expiresAt,
        });
      } else {
        res.status(403).json({
          message: "Wrong email or password.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong." });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default authenticate;
