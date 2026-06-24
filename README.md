# ✝️ Paroisse Indépendante Orthodoxe Sainte Marie

**Site Internet Officiel avec Webhooks N8N Sécurisés**

## 🌟 Caractéristiques

- ✨ **Design élégant** avec palette dorée et parcheminée
- 📝 **Formulaire de contact** sécurisé avec validation
- 💬 **Chat flottant (Spirit)** - Assistant spirituel via N8N
- 🔒 **Proxy sécurisé** - URLs N8N masquées
- 🚀 **Déployé sur Vercel** - Serverless et scalable
- 🛡️ **Protection CORS** + Rate limiting
- 📱 **Responsive Design** - Mobile friendly

## 📁 Structure du projet

```
paroisse-sainte-marie/
├── index.html              # Page principale (site complet)
├── api/
│   ├── contact.js          # Proxy pour formulaire de contact
│   ├── chat.js             # Proxy pour chat Spirit
│   └── health.js           # Health check du serveur
├── pages/                  # Pages secondaires
├── vercel.json             # Configuration Vercel
├── package.json            # Dépendances Node
├── .env.example            # Variables d'environnement (template)
├── .gitignore              # Fichiers ignorés par Git
├── README.md               # Ce fichier
├── QUICK_START.md          # Déploiement rapide en 5 min
├── DEPLOYMENT.md           # Guide de déploiement complet
└── SECURITY.md             # Guide de sécurité
```

## 🚀 Déploiement rapide

### Option 1 : Suivre le QUICK START (Recommandé)

```bash
# Lire et suivre les 5 étapes
cat QUICK_START.md
```

### Option 2 : Déploiement manuel

1. **Prérequis** :
   - Compte GitHub
   - Compte Vercel (gratuit)

2. **Initialiser Git** :
```bash
git init
git add .
git commit -m "Paroisse Sainte Marie - Initial commit"
```

3. **Créer un repository GitHub** et pousser :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/paroisse-sainte-marie.git
git push -u origin main
```

4. **Déployer sur Vercel** :
   - Aller sur https://vercel.com/new
   - Sélectionner votre repository
   - Ajouter les variables d'environnement
   - Cliquer "Deploy"

5. **Configurer le domaine** (optionnel) :
   - Ajouter votre domaine personnalisé dans Vercel

## 🔧 Configuration

### Variables d'environnement requises


## 🛡️ Sécurité

### Architecture sécurisée

```
Frontend (Client navigateur)
    ↓
Vercel API Routes (Proxy sécurisé)
    ├─→ Validation des données
    ├─→ Rate limiting
    ├─→ Anonymisation des IPs
    └─→ Headers de sécurité
    ↓
N8N Webhooks (URLs masquées)
```

### Mesures implémentées

✅ **Validation côté serveur** - Tous les inputs validés
✅ **Rate limiting** - Max 5 appels/min par IP
✅ **CORS restrictif** - Whitelist d'origines
✅ **Headers de sécurité** - HSTS, X-Frame-Options, etc.
✅ **Anonymisation** - IPs hashées (non stockées)
✅ **Timeouts** - Prévention des attaques DoS

### Recommandations supplémentaires

Pour plus de sécurité en production :

1. **Ajouter un Secret N8N** (voir `SECURITY.md`)
2. **Activer IP whitelisting** dans N8N
3. **Configurer Redis** pour rate limiting distribué
4. **Monitorer les logs** Vercel et N8N

Voir `SECURITY.md` pour le guide complet.

## 📚 Documentation

- **`QUICK_START.md`** - Déployer en 5 minutes
- **`DEPLOYMENT.md`** - Guide complet et détaillé
- **`SECURITY.md`** - Bonnes pratiques de sécurité

## 🎯 Points clés

### Pour les utilisateurs du site

1. **Formulaire de Contact** 📝
   - Champs : Nom, Prénom, Email, Motif, Message
   - Envoyer → Formulaire est validé et sécurisé
   - Réponse envoyée à N8N sans exposer l'URL

2. **Chat Spirit** 💬
   - Bouton flottant en bas à droite
   - Discutez avec l'assistant spirituel
   - Les messages sont sécurisés via le proxy Vercel

### Pour les administrateurs

1. **Logs en temps réel** - Voir sur Vercel Dashboard
2. **Monitoring** - Vérifier `/api/health`
3. **Mises à jour** - Faire un `git push`, redéploiement auto
4. **Secrets** - Gérés dans Vercel, jamais en clair

## 🔄 Workflow de mise à jour

```bash
# 1. Modifier le code
# (éditer index.html, pages/, etc.)

# 2. Tester localement (optionnel)
# Ouvrir index.html dans navigateur

# 3. Pousser vers GitHub
git add .
git commit -m "Description du changement"
git push origin main

# ✨ Vercel redéploiera automatiquement !
```

## 📊 Endpoints API

### POST /api/contact
Envoie un formulaire de contact à N8N.

**Body** :
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "motif": "information",
  "message": "Je souhaite en savoir plus...",
  "timestamp": "2024-05-20T10:30:00Z"
}
```

**Réponse** :
```json
{
  "success": true,
  "message": "Message reçu avec succès",
  "requestId": "req_1234567890_abc123"
}
```

### POST /api/chat
Envoie un message au chat Spirit.

**Body** :
```json
{
  "message": "Bonjour Spirit!",
  "timestamp": "2024-05-20T10:30:00Z"
}
```

**Réponse** :
```json
{
  "response": "Bonjour! Comment puis-je vous aider?",
  "requestId": "req_1234567890_def456"
}
```

### GET /api/health
Vérifie la santé du serveur proxy.

**Réponse** :
```json
{
  "status": "healthy",
  "timestamp": "2024-05-20T10:30:00Z",
  "apis": {
    "contact": "/api/contact",
    "chat": "/api/chat",
    "health": "/api/health"
  }
}
```

## 🤝 Support & Contribution

Pour des questions ou améliorations :

1. Ouvrir une issue sur GitHub
2. Consulter la documentation fournie
3. Voir `SECURITY.md` pour les questions de sécurité

## 📜 Licence

MIT License - Libre d'utilisation et de modification.

---

## ✝️ À propos

**Paroisse Indépendante Orthodoxe Sainte Marie**

- 📍 Patriarcat Marial · Église Associative N°173010600
- 📅 Fondée le 18 Mars 2024
- 🌍 Présence internationale : France, Congo, Gabon, Mexique
- 👨‍🙏 Fondateur : Mgr Anthony Jésus Marie

> "Guidée par la Mère des Mères · Ancrée dans la Tradition Apostolique"

---

**Créé avec ❤️ et 🙏 pour la Paroisse Sainte Marie**

*Que nul n'en ignore. Sous la protection de la Sainte Mère de Dieu.*
