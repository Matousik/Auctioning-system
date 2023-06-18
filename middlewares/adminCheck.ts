import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../models/User';

async function adminCheck(req: NextApiRequest, res: NextApiResponse, handler: Function) {
  try {
    const token = req.cookies['auth-token'];
    if (!token) throw new Error('Authentication failed.');

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.userId);

    if (user?.role !== 'admin') throw new Error('Not authorized.');

    return handler(req, res);
  } catch (error) {
    if (error instanceof Error) {
        return res.status(401).json({ success: false, message: error.message });
      } else {
        return res.status(401).json({ success: false });
      }  }
}

export default adminCheck;
