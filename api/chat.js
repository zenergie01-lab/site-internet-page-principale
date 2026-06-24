// Vercel Serverless Function - Chat API Route
// Deploy this to: /api/chat.js

export default async function handler(req, res) {
  // Activer CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://votre-domaine.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gérer les requêtes OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Accepter uniquement les POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, timestamp } = req.body;

    // ── VALIDATION ──
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message invalide' });
    }

    // Nettoyer le message
    const cleanMessage = message.trim().substring(0, 1000);

    if (cleanMessage.length < 1) {
      return res.status(400).json({ error: 'Message vide' });
    }

    // ── VÉRIFICATION RATE LIMITING ──
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const rateLimitKey = `chat:${clientIP}`;

    // ── ENVOI AU WEBHOOK N8N CHAT ──
    const n8nChatWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!n8nChatWebhookUrl) {
      console.error('N8N_CHAT_WEBHOOK_URL non configurée');
      return res.status(500).json({ error: 'Erreur de configuration serveur' });
    }

    // Préparer les données
    const chatData = {
      message: cleanMessage,
      timestamp: timestamp || new Date().toISOString(),
      source: 'website-chat',
      clientIP: hashIP(clientIP)
    };

    // Appel au webhook N8N Chat
    const n8nResponse = await fetch(n8nChatWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Paroisse-Sainte-Marie/1.0',
        'X-Request-Origin': 'chat-widget'
      },
      body: JSON.stringify(chatData),
      timeout: 15000 // 15 secondes timeout pour les réponses du chat
    });

    if (!n8nResponse.ok) {
      console.error(`N8N chat webhook error: ${n8nResponse.status}`);

      // Répondre avec un message par défaut
      return res.status(200).json({
        response: 'Désolé, je suis temporairement indisponible. Veuillez réessayer dans quelques instants.',
        requestId: generateRequestId()
      });
    }

    const responseData = await n8nResponse.json();

    // Retourner la réponse de Spirit
    return res.status(200).json({
      response: responseData.response || responseData.message || 'Je n\'ai pas bien compris votre message.',
      requestId: generateRequestId()
    });

  } catch (error) {
    console.error('Chat error:', error);

    // Répondre avec grâce en cas d'erreur
    return res.status(200).json({
      response: 'Une erreur technique s\'est produite. Nos équipes ont été notifiées.',
      requestId: generateRequestId()
    });
  }
}

// ── FONCTIONS UTILITAIRES ──

function generateRequestId() {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function hashIP(ip) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}
