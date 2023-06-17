import dbConnect from '../../dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {  
    await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // At this point, the user has logged in successfully.
    // TODO: Handle session or token creation for keeping the user logged in

    res.status(200).json({ success: true, message: 'Logged in' });
  } else {
    res.status(400).json({ success: false });
  }
}
