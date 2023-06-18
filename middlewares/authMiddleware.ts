import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

interface NextApiRequestExtended extends NextApiRequest {
  user?: any;
}

const authMiddleware = async (req: NextApiRequestExtended, res: NextApiResponse, next: () => void) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('auth-token');

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decodedToken;

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
