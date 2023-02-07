import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/dashboard";
import { verifyJWT } from "@utils/apiTools";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(verifyJWT); // TODO AUTH!
  if (req.method === "GET") {
    // Process a POST request
    return res.status(200).json(data);
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiDashboard;
