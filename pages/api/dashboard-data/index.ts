import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/dashboard";
import { requireAuth } from "../../../util/apiTools";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const dashboardData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Process a POST request
    return res.status(200).json(data);
  } else {
    // Handle any other HTTP method
    console.log(requireAuth);
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default dashboardData;
