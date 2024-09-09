// pages/api/auth/signin.js
import { signIn } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        return res.status(401).json({ error: 'Invalid Credentials' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
