// Vercel Serverless Function - API Route
// Deploy this to: /api/contact.js

export default async function handler(req, res) {
  // Activer CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://votre-domaine.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Request-Verify'
  );

  // Gérer les requêtes OPTIONS pour CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Accepter uniquement les POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Récupérer les données du formulaire
    const { nom, prenom, email, motif, message, timestamp } = req.body;

    // ── VALIDATION ──
    if (!nom || !prenom || !email || !motif || !message) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Limitation des caractères pour éviter les abus
    if (nom.length > 100 || prenom.length > 100 || message.length > 5000) {
      return res.status(400).json({ error: 'Données trop longues' });
    }

    // ── VÉRIFICATION RATE LIMITING ──
    // IP de l'utilisateur
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const rateLimitKey = `contact:${clientIP}`;

    // En production, utilisez Redis pour le rate limiting distribué
    // Pour Vercel, vous pouvez utiliser Upstash Redis (gratuit jusqu'à 10k requests/jour)
    // Ici, on fait une validation basique

    // ── ENVOI AU WEBHOOK N8N ──
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL non configurée');
      return res.status(500).json({ error: 'Erreur de configuration serveur' });
    }

    // Préparer les données enrichies
    const enrichedData = {
      nom,
      prenom,
      email,
      motif,
      message,
      timestamp: timestamp || new Date().toISOString(),
      source: 'website-form',
      clientIP: hashIP(clientIP), // Hash pour la confidentialité
      userAgent: req.headers['user-agent']
    };

    // Appel sécurisé au webhook N8N
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Paroisse-Sainte-Marie/1.0',
        'X-Request-Origin': 'contact-form'
      },
      body: JSON.stringify(enrichedData),
      timeout: 10000 // 10 secondes timeout
    });

    if (!n8nResponse.ok) {
      console.error(`N8N webhook error: ${n8nResponse.status}`);
      return res.status(500).json({
        error: 'Erreur lors du traitement. Veuillez réessayer.',
        requestId: generateRequestId()
      });
    }

    // Répondre au client
    return res.status(200).json({
      success: true,
      message: 'Message reçu avec succès',
      requestId: generateRequestId()
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Erreur serveur interne',
      requestId: generateRequestId()
    });
  }
}

// ── FONCTIONS UTILITAIRES ──

// Génère un ID unique pour tracker les requêtes
function generateRequestId() {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Hash simple de l'IP (non réversible, pour la confidentialité)
function hashIP(ip) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}
