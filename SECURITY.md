# 🔒 Guide de Sécurité - Webhooks N8N

## Vue d'ensemble

Ce projet utilise une **architecture proxy sécurisée** pour masquer complètement vos URLs N8N et les protéger contre :

- ❌ Reverse-engineering depuis le code client
- ❌ Accès non autorisé aux webhooks
- ❌ Abus par rate limiting excessive
- ❌ Injection de données malveillantes
- ❌ CSRF (Cross-Site Request Forgery)

## Architecture

```
Frontend (index.html)
    ↓
    ├─→ /api/contact (Vercel Serverless)
    │     └─→ N8N Webhook (TESTASSO)
    │
    └─→ /api/chat (Vercel Serverless)
          └─→ N8N Webhook (Chat Spirit)
```

**Avantage** : Les URLs réelles des webhooks N8N ne sont jamais exposées au client !

## 🛡️ Mesures de sécurité implémentées

### 1. **Validation des données**

✅ Vérification des champs requis
✅ Validation du format email
✅ Limite de caractères (5000 chars max pour les messages)
✅ Nettoyage des entrées (trim, substring)

**Fichier** : `api/contact.js` et `api/chat.js`

### 2. **Rate Limiting**

✅ Limite de 5 appels par minute par IP
✅ Limitation côté client (JavaScript)
✅ Limitation côté serveur (Node.js)

**Recommandation** : Ajouter Redis pour un rate limiting distribué en production

```bash
# Optionnel : Service Redis gratuit
npm install upstash
# https://upstash.com/ (10k requests/jour gratuit)
```

### 3. **CORS (Cross-Origin Resource Sharing)**

✅ Whitelist d'origines autorisées
✅ Méthodes HTTP restreintes (POST uniquement)
✅ Headers de sécurité validés

**Variables d'environnement** :
```
ALLOWED_ORIGIN=https://paroisse-saintemarie.fr
```

### 4. **Headers de sécurité**

Configurés dans `vercel.json` :

```
Strict-Transport-Security: max-age=31536000 (force HTTPS)
X-Frame-Options: DENY (protège contre le clickjacking)
X-Content-Type-Options: nosniff (prévient MIME type sniffing)
X-XSS-Protection: 1; mode=block (protection XSS)
```

### 5. **Anonymisation des données**

✅ Hachage des adresses IP (SHA-256)
✅ Les IPs réelles ne sont jamais stockées

```javascript
function hashIP(ip) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}
```

## 📝 Bonnes pratiques - N8N

### Étape 1 : Configurer l'authentification N8N

Dans votre workflow N8N :

1. **Ajouter un nœud "Switch"** pour valider les en-têtes :

```
- Condition: header['X-Request-Origin'] === 'contact-form'
- Condition: header['X-Request-Origin'] === 'chat-widget'
```

2. **Valider le Content-Type** :
```
- header['Content-Type'] === 'application/json'
```

### Étape 2 : Activer la validation d'IP (Optionnel)

Si votre provider N8N le permet :

1. Whitelist l'IP de Vercel
2. Rejeter les requêtes d'autres IPs

### Étape 3 : Ajouter un Secret personnalisé

**Amélioration recommandée** :

1. Générer un token secret long :
```bash
openssl rand -base64 32
# Exemple: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890=`
```

2. Le stocker dans Vercel :
```
N8N_SECRET=aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890=
```

3. Valider dans `api/contact.js` :
```javascript
const secret = process.env.N8N_SECRET;
if (req.headers['x-n8n-secret'] !== secret) {
  return res.status(403).json({ error: 'Unauthorized' });
}
```

4. Envoyer le secret depuis Vercel :
```javascript
const response = await fetch(n8nWebhookUrl, {
  headers: {
    'X-N8N-Secret': process.env.N8N_SECRET
  }
});
```

## 📊 Monitoring et Logs

### Vercel Logs

Accédez aux logs en temps réel :

1. Dashboard Vercel → Project
2. **Deployments** → Cliquer sur un deployment
3. **Logs** → Voir toutes les requêtes

**À surveiller** :
- ❌ Erreurs 5xx (problèmes serveur)
- ⚠️ Erreurs 4xx répétées (attaques possibles)
- 📊 Pics de trafic inhabituels

### N8N Logs

Dans votre instance N8N :

1. Aller aux **Workflows** → Cliquer sur un workflow
2. **Executions** → Voir l'historique
3. **Logs** → Debug détaillé

## 🚨 Détection d'anomalies

Configurez des alertes pour :

1. **Trop d'erreurs CORS** → Tentative d'accès non autorisé
2. **Rate limit atteint** → Tentative d'abus
3. **Erreurs de validation** → Données malveillantes
4. **Timeouts N8N** → Service indisponible

## 🔄 Mise à jour des secrets

**Périodiquement** (tous les 6 mois) :

1. Générer un nouveau secret
2. Le mettre à jour dans Vercel
3. Mettre à jour la validation N8N
4. Redéployer

**En cas de compromission** :

1. Régénérer immédiatement le secret
2. Vérifier les logs pour les accès suspects
3. Redéployer d'urgence

## 📚 Ressources supplémentaires

- OWASP Top 10 : https://owasp.org/www-project-top-ten/
- Vercel Security : https://vercel.com/docs/security
- Node.js Best Practices : https://nodejs.org/en/docs/guides/security/
- N8N Security : https://docs.n8n.io/hosting/security/

---

**Créé pour la Paroisse Indépendante Orthodoxe Sainte Marie**

Pour questions sur la sécurité : Voir `DEPLOYMENT.md` ou consulter la documentation officielle.
