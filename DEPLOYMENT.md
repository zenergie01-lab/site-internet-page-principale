# 🚀 Guide de Déploiement sur Vercel

Paroisse Indépendante Orthodoxe Sainte Marie

## Prérequis

- Compte GitHub
- Compte Vercel (gratuit sur [vercel.com](https://vercel.com))
- Vos URLs N8N webhooks

## 📋 Étapes de déploiement

### 1. Préparer votre repository Git

```bash
cd "c:/Users/Vince/Documents/ASSO ORTHODOXE/site internet page principale"
git init
git add .
git commit -m "Initial commit: Paroisse Sainte Marie website with Vercel proxy"
```

### 2. Créer un repository sur GitHub

1. Aller sur [GitHub](https://github.com/new)
2. Créer un nouveau repository (ex: `paroisse-sainte-marie`)
3. Suivre les instructions pour pusher votre code local

```bash
git remote add origin https://github.com/VOTRE_USERNAME/paroisse-sainte-marie.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel

#### Option A : Via Vercel Dashboard (Recommandé)

1. Aller sur [vercel.com](https://vercel.com/dashboard)
2. Cliquer sur **"Add New..."** → **"Project"**
3. Sélectionner votre repository GitHub
4. **Important : Configuration des Variables d'Environnement**

Dans les **Project Settings** → **Environment Variables**, ajouter :

```
N8N_WEBHOOK_URL: https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO
N8N_CHAT_WEBHOOK_URL: https://n8n.srv999617.hstgr.cloud/webhook/dd293465-959d-4c3a-94ee-f5c9a632bde7/chat
ALLOWED_ORIGIN: https://votre-domaine.vercel.app
```

5. Cliquer sur **"Deploy"**

#### Option B : Via CLI Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### 4. Configurer le Domaine Personnalisé

1. Dans les **Project Settings** de Vercel
2. Aller à **Domains**
3. Ajouter votre domaine personnalisé (ex: `paroisse-saintemarie.fr`)
4. Mettre à jour les variables d'environnement avec votre vrai domaine :

```
ALLOWED_ORIGIN: https://paroisse-saintemarie.fr
```

5. Redéployer le projet (ou faire un nouveau commit)

## 🔒 Sécurité - Configuration N8N

Pour sécuriser vos webhooks N8N, faites ceci :

### Dans N8N :

1. **Activer l'authentification par IP** (si possible)
   - Ajouter l'IP de Vercel à la whitelist
   - Vercel IPs : [Consulter la doc Vercel](https://vercel.com/docs/edge-network/edge-middleware#vercel-ip-addresses)

2. **Ajouter un Secret/Token personnalisé**
   - Dans votre workflow N8N, valider le header `X-Request-Origin`
   - Vérifier que la requête vient bien du domaine autorisé

3. **Limiter le débit (Rate Limiting)**
   - N8N permet de limiter les appels par IP/minute
   - Recommandation : 10 appels/min max par IP

### Dans Vercel :

✅ **Déjà configuré dans les fichiers** :
- Validation des en-têtes CORS
- Headers de sécurité (X-Frame-Options, HSTS, etc.)
- Rate limiting côté client (5 appels/min)
- Validation des données d'entrée
- Hash des IPs pour la confidentialité

## 📊 Structure du projet

```
paroisse-sainte-marie/
├── index.html              # Page principale
├── pages/                  # Pages secondaires
├── api/
│   ├── contact.js          # API proxy pour le formulaire
│   └── chat.js             # API proxy pour le chat
├── vercel.json             # Configuration Vercel
├── package.json            # Dependencies
├── .env.example            # Template variables d'env
├── .gitignore              # Fichiers ignorés
└── DEPLOYMENT.md           # Ce fichier
```

## 🔄 Workflow de mise à jour

À chaque modification du code :

```bash
git add .
git commit -m "Description du changement"
git push origin main
```

Vercel redéploiera automatiquement ! ✨

## 🆘 Dépannage

### Erreur "N8N_WEBHOOK_URL not defined"

- Vérifier que les variables d'environnement sont bien définies dans Vercel Dashboard
- Attendre quelques secondes après les avoir ajoutées (délai de propagation)
- Redéployer le projet

### Erreur CORS

- Vérifier que `ALLOWED_ORIGIN` correspond exactement à votre domaine
- Inclure le protocole : `https://` (pas `http://`)
- Éviter les trailing slashes

### Erreur "Method not allowed"

- Vérifier que le formulaire envoie une requête POST
- Vérifier les headers `Content-Type: application/json`

## 📞 Support N8N

- Docs N8N : https://docs.n8n.io/
- Community : https://community.n8n.io/

## 🎉 Succès !

Votre site est maintenant en ligne avec :

✅ Formulaire de contact sécurisé
✅ Chat Spirit avec proxy sécurisé
✅ Webhooks N8N masqués au client
✅ Protection contre les abus (rate limiting)
✅ Headers de sécurité renforcés
✅ Validation des données côté serveur

---

**Créé pour la Paroisse Indépendante Orthodoxe Sainte Marie**
Patriarcat Marial · Fondée le 18 Mars 2024
