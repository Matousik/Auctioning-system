import dbConnect from '../../dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export interface UserObject {
    _id: string;
    email: string;
    password: string;
    role: string;
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {  
    await dbConnect();

  if (req.method === 'POST') {
    const { email, password: passwordFromReq } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(passwordFromReq, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d', // token will expire in 1 day
      });

    // Set cookie
    const cookies = new Cookies(req, res);
    cookies.set('auth-token', token, {
        httpOnly: true, // client-side JavaScript cannot access the cookie
        // Enable in production mode
        // nsecure: process.env.NODE_ENV === 'production', // cookie will only be set when https is used
        sameSite: 'strict', // cookie will only be sent to the same site as the one that originated it
        maxAge: 86400, // cookie will expire after 1 day
        path: '/', // cookie will be available in all routes
    });

    const { password, ...userWithoutPassword }: UserObject  = user.toObject();

    res.status(200).json({ success: true, message: 'Logged in', user: userWithoutPassword });
  } else {
    res.status(400).json({ success: false });
  }
}
