import dbConnect from '../../dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {  
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ email, password: hashedPassword, role });

    await newUser.save();

    res.status(201).json({ success: true, data: newUser });
  } else {
    res.status(400).json({ success: false });
  }
}
