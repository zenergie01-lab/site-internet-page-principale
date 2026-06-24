# 🖥️ Développement Local - Tester avant de déployer

## Installation

### Prérequis

- **Node.js 18+** → https://nodejs.org/
- **Git** → https://git-scm.com/
- **Vercel CLI** (optionnel) → `npm install -g vercel`

### 1. Installer les dépendances

```bash
cd "C:\Users\Vince\Documents\ASSO ORTHODOXE\site internet page principale"
npm install
```

## 🚀 Démarrer l'environnement de développement

### Option A : Avec Vercel CLI (Recommandé)

Cela simule exactement Vercel localement :

```bash
vercel dev
```

**Sortie attendue** :
```
> Ready! Available at http://localhost:3000
> API: http://localhost:3000/api/contact
> API: http://localhost:3000/api/chat
```

### Option B : Serveur Web simple

Si vous voulez juste servir le HTML statique :

```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js
npx http-server -p 8000
```

Puis ouvrir : http://localhost:8000

## 🔧 Configuration locale

### Créer `.env.local` :

```env
N8N_WEBHOOK_URL=https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO
N8N_CHAT_WEBHOOK_URL=https://n8n.srv999617.hstgr.cloud/webhook/dd293465-959d-4c3a-94ee-f5c9a632bde7/chat
ALLOWED_ORIGIN=http://localhost:3000
```

## ✅ Tester le formulaire

### 1. Ouvrir http://localhost:3000

### 2. Scroller jusqu'à "Entrez en Contact"

### 3. Cliquer "Formulaire de Contact"

### 4. Remplir le formulaire :

| Champ | Valeur |
|-------|--------|
| Nom | Dupont |
| Prénom | Jean |
| Email | jean@example.com |
| Motif | Information sur la Paroisse |
| Message | Ceci est un test |

### 5. Cliquer "Envoyer"

**Résultats attendus** :
- ✅ Message de succès
- ✅ Modal se ferme après 2 secondes
- ✅ Les données arrivent dans N8N

### 6. Vérifier les logs :

#### Terminal (Vercel Dev)
```
POST /api/contact 200 45ms
```

#### Console navigateur (F12)
```
Status: 200
Response: {"success": true, ...}
```

#### N8N Webhook
1. Aller sur votre instance N8N
2. Workflow → Executions
3. Voir la dernière exécution avec les données du formulaire

## 💬 Tester le Chat Spirit

### 1. Voir la bubble en bas à droite

Couleur dorée avec icône 💬

### 2. Cliquer sur le bubble

La fenêtre de chat s'ouvre

### 3. Envoyer un message

Exemple : "Bonjour Spirit!"

### 4. Vérifier la réponse

Spirit devrait répondre (si N8N est configuré)

### 5. Vérifier les logs

#### Terminal
```
POST /api/chat 200 120ms
```

#### N8N Executions
Voir le message reçu et la réponse envoyée

## 🐛 Debug

### Console Navigateur (F12)

Onglet **Console** - Voir les erreurs JavaScript

```javascript
// Exemple d'erreur courante
Uncaught TypeError: fetch is not defined
// Solution: Vérifier que le navigateur supporte fetch
```

### Onglet Network (F12)

Voir les requêtes API :

1. Faire une action (envoyer formulaire)
2. Onglet **Network**
3. Voir `contact` ou `chat`
4. **Response** → Voir la réponse JSON
5. **Headers** → Vérifier les en-têtes

### Vercel Dev Logs

```bash
# Dans le terminal où vercel dev tourne
# Voir les logs en temps réel
```

## 🔍 Tests courants

### Test 1 : Validation email

```
Email: "invalide"
Résultat: Erreur "Email invalide" ✅
```

### Test 2 : Champs vides

```
Nom: (vide)
Résultat: Erreur "Veuillez remplir tous les champs" ✅
```

### Test 3 : Message trop long

```
Message: "a" * 5001 (5001 caractères)
Résultat: Erreur (côté serveur, limité à 5000) ✅
```

### Test 4 : Trop de requêtes rapides

```
Envoyer 6 formulaires en moins de 1 minute
Résultat: 6ème échoue avec "Trop de tentatives" ✅
```

### Test 5 : CORS

```
Ouvrir depuis un domaine différent
Résultat: Erreur CORS (domaine non whitelisté) ✅
```

## 📈 Performance

### Vérifier les temps de réponse

Onglet **Network** → Voir la colonne **Time**

**Normal** :
- Formulaire : 50-200ms
- Chat : 100-300ms (N8N peut être plus lent)

**Lent** :
- Plus de 1 seconde → Vérifier N8N
- Plus de 5 secondes → Problème serveur

## 🚀 Build pour production

Avant de déployer, vérifier la build :

```bash
npm run build
```

**Résultat attendu** :
```
✓ Build successful
```

## 🔐 Tester la sécurité

### Test 1 : Injection SQL (impossible ici, mais tester)

```
Email: "test@example.com'; DROP TABLE users; --"
Résultat: Email invalide (validation) ✅
```

### Test 2 : XSS (Script injection)

```
Message: "<script>alert('XSS')</script>"
Résultat: Envoyé comme texte brut (pas exécuté) ✅
```

### Test 3 : CSRF

```
Header Origin: "https://site-malveillant.com"
Résultat: Bloqué par CORS ✅
```

## 📋 Checklist avant déploiement

- [ ] Formulaire fonctionne localement
- [ ] Chat fonctionne localement
- [ ] N8N reçoit les données
- [ ] N8N envoie les réponses
- [ ] Variables d'env configurées
- [ ] Logs vérifiés
- [ ] Domaine personnalisé prêt (optionnel)
- [ ] Secrets N8N configurés (recommandé)

## 🚀 Déployer

Une fois vérifié localement :

```bash
git add .
git commit -m "Test local OK - Ready for production"
git push origin main

# Vercel redéploiera automatiquement !
```

## 📞 Dépannage

### Erreur: "Cannot find module 'crypto'"

**Cause** : Version Node.js < 18

**Solution** :
```bash
node --version  # Vérifier (doit être ≥ 18.x)
# Si besoin, télécharger depuis nodejs.org
```

### Erreur: "CORS error"

**Cause** : ALLOWED_ORIGIN mal configuré

**Solution** :
```bash
# Dans .env.local
ALLOWED_ORIGIN=http://localhost:3000  # Sans trailing slash
```

### Erreur: "N8N_WEBHOOK_URL not defined"

**Cause** : Variable d'env non chargée

**Solution** :
```bash
# Vérifier .env.local existe
# Redémarrer vercel dev
vercel dev
```

### Chat ne répond pas

**Cause** : N8N offline ou webhook cassé

**Solution** :
1. Vérifier N8N est en ligne
2. Vérifier l'URL webhook
3. Voir les logs N8N pour les erreurs

## 📚 Ressources

- **Vercel Dev** : https://vercel.com/docs/cli/vercel/dev
- **Node.js** : https://nodejs.org/
- **N8N Docs** : https://docs.n8n.io/

---

**Happy coding! 🎉**

*Des questions? Voir README.md ou DEPLOYMENT.md*
