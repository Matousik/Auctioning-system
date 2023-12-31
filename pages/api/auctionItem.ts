import dbConnect from '../../dbConnect';
import AuctionItem from '../../models/AuctionItem';
import adminCheck from '@/middlewares/adminCheck';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const auctionItems = await AuctionItem.find({});
        res.status(200).json({ success: true, data: auctionItems })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      await adminCheck(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
          const auctionItem = await AuctionItem.create(req.body);
          res.status(201).json({ success: true, data: auctionItem })
        } catch (error) {
          res.status(400).json({ success: false })
        }
      })(req,res);
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}
