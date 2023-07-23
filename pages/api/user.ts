import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware, { NextApiRequestExtended } from '../../middlewares/authMiddleware';
import User from '../../models/User';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    const userReq = req as NextApiRequestExtended;
    if (userReq.user) {
      // Do not fetch password here.
      const user = await User.findById(userReq.user.userId).select('-password');
      res.status(200).json({ user });
      console.log("User api route: " + user)
    } else {
      res.status(401).json({ success: false, message: 'User not found during authentication.' });
    }
  });
}
