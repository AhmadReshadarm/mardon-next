import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { email, text } = req.body;
  const baseURL = process.env.API_URL;
  if (!baseURL) return res.status(500).json({ error: 'API_URL missing' });

  try {
    const response = await fetch(`${baseURL}/users/help`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, text }),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward error report' });
  }
}
