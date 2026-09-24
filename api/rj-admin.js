export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  const url = 'https://dfdrbdoqewqttwjvfcwk.supabase.co/functions/v1/rj-admin';
  try {
    const headers = {
      'Content-Type': 'application/json',
      'apikey': 'sb_publishable_FQ4pz3CMU6F7Rs8HaaAxdQ_GQqY0zfe'
    };
    if (req.headers.authorization) headers.Authorization = req.headers.authorization;

    const upstream = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body || {})
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (error) {
    return res.status(502).json({
      error: 'Connexion au service admin impossible',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
