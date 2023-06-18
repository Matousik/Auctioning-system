import dbConnect from '../../../dbConnect';
import AuctionItem from '../../../models/AuctionItem';
import adminCheck from '@/middlewares/adminCheck';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auctionItem = await AuctionItem.findById(id);
        if (!auctionItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: auctionItem });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      await adminCheck(req, res, async () => {
        try {
          const auctionItem = await AuctionItem.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!auctionItem) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: auctionItem });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      });
      break;
    case 'DELETE':
      await adminCheck(req, res, async () => {
        try {
          const deletedAuctionItem = await AuctionItem.deleteOne({ _id: id });
          if (!deletedAuctionItem) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
