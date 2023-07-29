// /pages/api/users/index.ts

import { NextApiResponse } from 'next';
import dbConnect from '../../../dbConnect';
import User from '../../../models/User';
import adminCheck from '@/middlewares/adminCheck';
import authMiddleware, { NextApiRequestExtended } from '@/middlewares/authMiddleware';

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await dbConnect();

  const users = await User.find({});
  
  res.status(200).json(users);
};

export default authMiddleware(adminCheck(handler));
