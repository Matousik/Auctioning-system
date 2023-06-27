import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware, { NextApiRequestExtended } from '../../middlewares/authMiddleware';
import User from '../../models/User';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    const userReq = req as NextApiRequestExtended;
    const user = await User.findById(userReq.user.userId);
    res.status(200).json({ user });
  });
}
