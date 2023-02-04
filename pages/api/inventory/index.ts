import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "../../../utils/apiTools";
import InventoryItemModel from "../../../models/InventoryItemModel";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(requireAuth); // TODO AUTH!
  if (req.method === "GET") {
    await connectMongo("GET from inventory api");

    try {
      const user = req.body.user.sub;
      const inventoryItems = await InventoryItemModel.find({
        user,
      });
      res.status(200).json(inventoryItems);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else if (req.method === "POST") {
    try {
      await connectMongo();

      const userId = req.body.user.sub;
      const input = Object.assign({}, req.body, {
        user: userId,
      });
      const inventoryItem = new InventoryItemModel(input);
      await inventoryItem.save();
      res.status(201).json({
        message: "Inventory item created!",
        inventoryItem,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem creating the item",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiInventory;
