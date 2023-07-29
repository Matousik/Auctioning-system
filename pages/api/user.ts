import { NextApiResponse } from 'next';
import authMiddleware, { NextApiRequestExtended } from '../../middlewares/authMiddleware';
import User from '../../models/User';

const user = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.user) {
    // Do not fetch password here.
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json({ user });
    console.log("User api route: " + user)
  } else {
    res.status(401).json({ success: false, message: 'User not found during authentication.' });
  }
}

export default authMiddleware(user);

