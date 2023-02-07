import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@utils/apiTools";
import connectMongo from "@utils/connectMongo";
import InventoryItemModel from "../../../models/InventoryItemModel";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiDeleteInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    try {
      const token = req.headers.authorization?.substring(7);
      const userInfo = verifyJWT(token as string);

      await connectMongo();

      const deletedItem = await InventoryItemModel.findOneAndDelete({
        _id: req.query.id,
        user: userInfo.sub,
      });
      res.status(201).json({
        message: "Inventory item deleted!",
        deletedItem,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem deleting the item.",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiDeleteInventory;
