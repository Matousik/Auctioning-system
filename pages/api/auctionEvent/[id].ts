import dbConnect from '../../../dbConnect';
import AuctionEvent from '../../../models/AuctionEvent';
import { NextApiRequest, NextApiResponse } from 'next';
import adminCheck from '@/middlewares/adminCheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const { id } = req.query; // Extract the id from the query params

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auctionEvent = await AuctionEvent.findById(id);
        if (!auctionEvent) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: auctionEvent });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      await adminCheck(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const auctionEvent = await AuctionEvent.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!auctionEvent) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: auctionEvent });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      })(req,res);
      break;
    case 'DELETE':
      await adminCheck(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const deletedAuctionEvent = await AuctionEvent.deleteOne({ _id: id });
          if (!deletedAuctionEvent) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      })(req,res);
      // TODO: When auction event gets deleted, implement deleting also all auction items associated with it.
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
