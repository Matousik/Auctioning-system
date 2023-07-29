import dbConnect from '../../dbConnect';
import AuctionEvent from '../../models/AuctionEvent';
import { NextApiRequest, NextApiResponse } from 'next';
import adminCheck from '@/middlewares/adminCheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auctionEvents = await AuctionEvent.find({});
        res.status(200).json({ success: true, data: auctionEvents })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      adminCheck(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const auctionEvent = await AuctionEvent.create(req.body);
          res.status(201).json({ success: true, data: auctionEvent });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      })(req, res);
      break;
    // PUT and DELETE requests are handled in pages/api/auctionEvent/[id].ts      
    default:
      res.status(400).json({ success: false })
      break;
  }
}
