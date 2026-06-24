// Vercel Serverless Function - Health Check
// Utilité: Vérifier que le serveur proxy fonctionne correctement

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: {
        node_version: process.version,
        env_configured: {
          n8n_webhook_url: !!process.env.N8N_WEBHOOK_URL,
          n8n_chat_webhook_url: !!process.env.N8N_CHAT_WEBHOOK_URL,
          allowed_origin: !!process.env.ALLOWED_ORIGIN
        }
      },
      apis: {
        contact: '/api/contact',
        chat: '/api/chat',
        health: '/api/health'
      }
    };

    return res.status(200).json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
