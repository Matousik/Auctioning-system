import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const adminCheck = (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) =>{
  try {
    const token = req.cookies['auth-token'];
    if (!token) throw new Error('Authentication failed.');

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.userId);

    if (user?.role !== 'admin') throw new Error('Not authorized.');

    return await handler(req, res);
  } catch (error) {
    if (error instanceof Error) {
        return res.status(401).json({ success: false, message: error.message });
      } else {
        return res.status(401).json({ success: false });
      }  }
}

export default adminCheck;
