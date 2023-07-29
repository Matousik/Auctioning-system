import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { UserJWTPayload } from '@/interfaces/UserJWTPayload';

export interface NextApiRequestExtended extends NextApiRequest {
  user?: UserJWTPayload;
}

const authMiddleware = (handler: Function) => async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('auth-token');

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decodedToken as UserJWTPayload;

    return await handler(req, res);
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
