import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const cookies = new Cookies(req, res);

        // Remove the 'auth-token' cookie
        cookies.set('auth-token');

        // Respond with a success message
        res.status(200).json({ success: true, message: 'Logged out' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
