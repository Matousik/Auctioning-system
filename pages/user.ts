import dbConnect from '../dbConnect';
import authMiddleware from '../middlewares/authMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/User';

interface NextApiRequestExtended extends NextApiRequest {
  user?: any; // you can further refine the type here based on what information is stored in user
}

async function handler(req: NextApiRequestExtended, res: NextApiResponse) {
  await dbConnect();

  const user = await User.findById(req.user?.userId);

  res.status(200).json({ success: true, user });
}

export default function user(req: NextApiRequest, res: NextApiResponse) {
  authMiddleware(req as NextApiRequestExtended, res, () => handler(req, res));
}
