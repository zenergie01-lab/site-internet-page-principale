# 🏗️ Architecture du Système

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT NAVIGATEUR                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ index.html                                               │  │
│  │                                                          │  │
│  │  ✓ Formulaire de Contact (modal)                         │  │
│  │  ✓ Chat Spirit (floating widget)                         │  │
│  │  ✓ Sécurité côté client (rate limiting)                 │  │
│  │                                                          │  │
│  │  → POST /api/contact                                     │  │
│  │  → POST /api/chat                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         HTTPS/TLS
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL PROXY (Sécurisé)                      │
│                  Node.js Serverless Functions                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /api/contact.js                                          │  │
│  │                                                          │  │
│  │  ✓ Validation des données                               │  │
│  │  ✓ Vérification email                                   │  │
│  │  ✓ Rate limiting (5 req/min)                            │  │
│  │  ✓ Anonymisation IP                                     │  │
│  │  ✓ Headers de sécurité                                  │  │
│  │                                                          │  │
│  │  → Appel sécurisé à N8N                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /api/chat.js                                             │  │
│  │                                                          │  │
│  │  ✓ Validation message                                   │  │
│  │  ✓ Nettoyage (trim, substring)                          │  │
│  │  ✓ Rate limiting                                        │  │
│  │  ✓ Gestion erreurs N8N                                  │  │
│  │                                                          │  │
│  │  → Appel sécurisé à N8N                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /api/health.js                                           │  │
│  │                                                          │  │
│  │  ✓ Status du serveur                                    │  │
│  │  ✓ Vérification config                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         HTTPS/TLS
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       N8N WEBHOOKS                               │
│                    (URLs masquées côté client)                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Webhook Contact Form                                     │  │
│  │ https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO      │  │
│  │                                                          │  │
│  │ ✓ Reçoit les données du formulaire                      │  │
│  │ ✓ Envoie email à admin                                  │  │
│  │ ✓ Stocke en base de données                             │  │
│  │ ✓ Envoie email de confirmation au contact               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Webhook Chat Spirit                                      │  │
│  │ https://n8n.srv999617.hstgr.cloud/webhook/...            │  │
│  │                                                          │  │
│  │ ✓ Reçoit les messages du chat                           │  │
│  │ ✓ Lance l'AI pour générer une réponse                   │  │
│  │ ✓ Retourne la réponse au client                         │  │
│  │ ✓ Enregistre la conversation                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Flux de sécurité - Formulaire de Contact

```
1. UTILISATEUR écrit le formulaire
   └─→ nom, prenom, email, motif, message
   
2. FRONTEND valide
   ├─→ Champs remplis ?
   ├─→ Email valide ?
   └─→ Rate limiting OK ?
   
3. FRONTEND envoie à PROXY
   POST /api/contact
   ├─→ Content-Type: application/json
   └─→ X-Request-Verify: token sécurisé
   
4. PROXY VERCEL reçoit
   ├─→ Validation côté serveur
   │   ├─→ Email format ?
   │   ├─→ Longueur caractères ?
   │   └─→ Format données ?
   │
   ├─→ Anonymisation IP
   │   └─→ Hash SHA-256 de l'IP
   │
   ├─→ Rate limiting
   │   └─→ Max 5 requêtes/min par IP
   │
   └─→ Appel sécurisé à N8N
       ├─→ HTTPS avec certificat valide
       ├─→ Headers de sécurité
       └─→ Timeout 10 secondes
   
5. N8N TRAITE
   ├─→ Reçoit les données
   ├─→ Envoie email de confirmation
   ├─→ Sauvegarde en base
   └─→ Envoie réponse
   
6. PROXY retourne réponse au FRONTEND
   ├─→ Success: message confirmé
   └─→ Error: message d'erreur
   
7. FRONTEND affiche résultat
   ├─→ Message de succès
   ├─→ Ferme le modal après 2s
   └─→ Réinitialise le formulaire
```

## 💬 Flux de sécurité - Chat Spirit

```
1. UTILISATEUR envoie message
   └─→ "Bonjour Spirit!"
   
2. FRONTEND valide
   ├─→ Message non vide ?
   ├─→ Longueur < 1000 caractères ?
   └─→ Rate limiting OK ?
   
3. FRONTEND envoie à PROXY
   POST /api/chat
   ├─→ { message, timestamp }
   └─→ Content-Type: application/json
   
4. PROXY VERCEL reçoit
   ├─→ Validation
   │   ├─→ Message valide ?
   │   └─→ Longueur acceptable ?
   │
   ├─→ Nettoyage
   │   └─→ Trim + Substring
   │
   └─→ Appel sécurisé à N8N
       ├─→ HTTPS
       └─→ Timeout 15 secondes
   
5. N8N TRAITE
   ├─→ Reçoit le message
   ├─→ Lance AI/Processing
   ├─→ Génère réponse
   ├─→ Enregistre conversation
   └─→ Retourne réponse
   
6. PROXY retourne réponse au FRONTEND
   ├─→ response: "Réponse de Spirit"
   └─→ requestId: "req_123456..."
   
7. FRONTEND affiche message
   ├─→ Ajoute bulle de chat
   ├─→ Scroll automatique
   └─→ Prêt pour le prochain message
```

## 📊 Infrastructure Vercel

```
┌──────────────────────────────────────────┐
│          VERCEL EDGE NETWORK             │
│    (Distribution globale + CDN)          │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │   Static Assets                    │  │
│  │   - index.html (cached)            │  │
│  │   - CSS/JS (gzipped + minified)    │  │
│  │   - Images                         │  │
│  │   (Serveur en < 50ms worldwide)    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │   Serverless Functions             │  │
│  │   - /api/contact                   │  │
│  │   - /api/chat                      │  │
│  │   - /api/health                    │  │
│  │   (Auto-scale, payez à l'usage)    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │   Analytics & Monitoring           │  │
│  │   - Deployments                    │  │
│  │   - Real-time logs                 │  │
│  │   - Performance metrics            │  │
│  │   - Error tracking                 │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

## 🔄 Déploiement Continu (CI/CD)

```
┌─────────────────┐
│  git push       │  Vous committez vos changements
│  origin main    │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  GitHub Webhook                     │  GitHub notifie Vercel
│  → Vercel                           │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Vercel Build Pipeline              │  Vercel teste et build
│  1. Install dependencies            │
│  2. Run build command               │
│  3. Test (optionnel)                │
│  4. Deploy to Edge Network          │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  ✅ Live! 🎉                        │  Site en ligne automatiquement
│  https://paroisse-saintemarie...    │
└─────────────────────────────────────┘
```

## 📈 Performance

### Timings typical

```
Cas 1 : Charger le site (première visite)
├─→ DNS Lookup: 50ms
├─→ TLS Handshake: 100ms
├─→ Download HTML/CSS/JS: 200ms
├─→ Parse & Render: 300ms
└─→ Total: ~650ms (page interactive)

Cas 2 : Envoyer le formulaire
├─→ Validation client: 10ms
├─→ POST /api/contact: 100ms (Vercel)
├─→ Vercel → N8N: 150ms
├─→ N8N traite & répond: 200ms
├─→ Vercel → Client: 50ms
└─→ Total: ~510ms (message reçu)

Cas 3 : Message chat
├─→ POST /api/chat: 100ms
├─→ Vercel → N8N: 150ms
├─→ N8N traite (AI): 2000ms (peut être lent)
├─→ N8N → Vercel: 50ms
├─→ Vercel → Client: 50ms
└─→ Total: ~2350ms (réponse reçue)
```

## 🔌 Points d'intégration N8N

### Webhook Contact Form

N8N reçoit :
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "motif": "information",
  "message": "Message...",
  "timestamp": "2024-05-20T10:30:00Z",
  "source": "website-form",
  "clientIP": "a1b2c3d4..." // Hashé
}
```

N8N peut :
- ✅ Envoyer email à l'admin
- ✅ Sauvegarder en base de données
- ✅ Envoyer email de confirmation
- ✅ Intégrer avec CRM
- ✅ Trigger d'autres workflows

### Webhook Chat Spirit

N8N reçoit :
```json
{
  "message": "Bonjour Spirit!",
  "timestamp": "2024-05-20T10:30:00Z",
  "source": "website-chat",
  "clientIP": "x1y2z3..." // Hashé
}
```

N8N doit retourner :
```json
{
  "response": "Bonjour! Comment puis-je vous aider?",
  "message": "..." // Alternative à response
}
```

N8N peut :
- ✅ Utiliser OpenAI/Anthropic pour l'IA
- ✅ Rechercher dans une base de connaissances
- ✅ Enregistrer la conversation
- ✅ Envoyer alerte au staff

## 🛡️ Couches de sécurité

```
Couche 1: HTTPS/TLS
├─→ Chiffrement en transit
└─→ Certificat validé

Couche 2: CORS (Client)
├─→ Whitelist d'origines
├─→ Validation origin header
└─→ Preflight checks

Couche 3: Rate Limiting (Client)
├─→ Limite 5 req/min par IP
└─→ Blocage temporaire après

Couche 4: Validation (Serveur)
├─→ Email format
├─→ Longueur caractères
├─→ Types de données
└─→ Injection prevention

Couche 5: Rate Limiting (Serveur)
├─→ IP tracking
├─→ Limite stricte par IP
└─→ Rejette les excédents

Couche 6: Anonymisation
├─→ Hash SHA-256 des IPs
└─→ Non-reversible

Couche 7: Headers sécurité
├─→ HSTS (force HTTPS)
├─→ X-Frame-Options
├─→ X-Content-Type-Options
└─→ X-XSS-Protection

Couche 8: N8N (Optionnel)
├─→ IP whitelist
├─→ Secret token
└─→ Rate limiting N8N
```

## 📊 Monitoring & Logs

```
Vercel Dashboard
├─→ Deployments: historique et status
├─→ Functions: logs en temps réel
├─→ Analytics: trafic et performances
└─→ Errors: bugtracking automatique

N8N Dashboard
├─→ Executions: historique des requêtes
├─→ Logs: debug détaillé
└─→ Monitoring: uptime et performance

Google Analytics (optionnel)
├─→ Trafic utilisateurs
├─→ Comportement
└─→ Conversions
```

---

**Architecture créée pour la Paroisse Indépendante Orthodoxe Sainte Marie**

✝️ Fondée le 18 Mars 2024
