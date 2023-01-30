import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "../../../util/apiTools";
import connectMongo from "../../../util/connectMongo";
import InventoryItemModel from "../../../models/InventoryItemModel";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiDeleteInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log(requireAuth); // TODO AUTH!
  if (req.method === "DELETE") {
    try {
      await connectMongo();

      const deletedItem = await InventoryItemModel.findOneAndDelete({
        _id: req.query.id,
        user: req.body.user.sub,
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
