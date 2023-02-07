import { NextApiRequest, NextApiResponse } from "next";
import { createToken, verifyPassword } from "@utils/apiTools";
import connectMongo from "@utils/connectMongo";
import UserModel from "../../../models/UserModel";
import IUser from "../../../interfaces/IUser";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { serialize } from "cookie";

export const config = {
  runtime: "nodejs",
};

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Something went wrong." });
  }

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
      const accessToken = createToken(userInfo, 1);
      const refreshToken = createToken(userInfo, 24);
      const decodedAToken: JwtPayload = jwtDecode(accessToken);
      const expiresInAT = new Date(decodedAToken.exp as number);
      const decodedRToken: JwtPayload = jwtDecode(refreshToken);
      const expiresInRT = new Date(decodedRToken.exp as number);

      res.setHeader("Set-Cookie", [
        serialize("access-token", accessToken, {
          secure: true,
          sameSite: "lax",
          path: "/",
          expires: expiresInAT,
        }),
        serialize("refresh-token", refreshToken, {
          secure: true,
          sameSite: "lax",
          path: "/",
          httpOnly: true,
          expires: expiresInRT,
        }),
      ]);

      return res.status(200).json({
        message: "Authentication successful!",
        token: accessToken,
        userInfo,
        expiresInAT,
      });
    } else {
      return res.status(403).json({
        message: "Wrong email or password.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Authentication failed.",
    });
  }
};

export default authenticate;
