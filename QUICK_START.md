# ⚡ Quick Start - Déploiement Vercel en 5 minutes

## 1️⃣ Préparation (1 min)

### Si vous n'avez pas Git installé :
- Télécharger : https://git-scm.com/
- Installer et redémarrer votre terminal

### Si vous n'avez pas de compte GitHub :
- Créer un compte : https://github.com/signup

## 2️⃣ Terminal - Initialiser Git (1 min)

Ouvrir PowerShell dans le dossier du site :

```powershell
cd "C:\Users\Vince\Documents\ASSO ORTHODOXE\site internet page principale"

git init
git config user.name "Votre Nom"
git config user.email "votre@email.com"
git add .
git commit -m "Paroisse Sainte Marie - Initial commit"
```

## 3️⃣ GitHub - Créer le repository (1 min)

1. Aller sur https://github.com/new
2. **Repository name** : `paroisse-sainte-marie`
3. **Description** : "Site officiel de la Paroisse Indépendante Orthodoxe Sainte Marie"
4. Cliquer **Create repository**

## 4️⃣ Terminal - Pousser vers GitHub (1 min)

```powershell
git remote add origin https://github.com/VOTRE_USERNAME/paroisse-sainte-marie.git
git branch -M main
git push -u origin main
```

*Remplacer `VOTRE_USERNAME` par votre pseudo GitHub*

## 5️⃣ Vercel - Déployer (1 min)

### Étape A : Inscription Vercel

1. Aller sur https://vercel.com/signup
2. Cliquer **"Continue with GitHub"**
3. Autoriser Vercel
4. ✅ Vous êtes connecté !

### Étape B : Importer le projet

1. Aller sur https://vercel.com/new
2. **Chercher votre repository** : `paroisse-sainte-marie`
3. Cliquer **Import**

### Étape C : Configurer les variables d'environnement

1. Voir la section **Environment Variables**
2. Ajouter 3 variables :

| Clé | Valeur |
|-----|--------|
| `N8N_WEBHOOK_URL` | `https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO` |
| `N8N_CHAT_WEBHOOK_URL` | `https://n8n.srv999617.hstgr.cloud/webhook/dd293465-959d-4c3a-94ee-f5c9a632bde7/chat` |
| `ALLOWED_ORIGIN` | `https://paroisse-sainte-marie.vercel.app` |

3. Cliquer **Deploy**

### ⏳ Attendre 2-3 minutes...

```
✓ Building...
✓ Ready
✓ https://paroisse-sainte-marie.vercel.app
```

## 🎉 C'est fait !

Votre site est maintenant en ligne !

### ✅ Tester :

1. Ouvrir : https://paroisse-sainte-marie.vercel.app
2. Scroller jusqu'à **"Entrez en Contact"**
3. Cliquer **"Formulaire de Contact"**
4. Remplir et envoyer
5. Voir le message en bas à droite : **Spirit** 💬

## 🌐 Ajouter votre domaine personnalisé (Optionnel)

Exemple : `paroisse-saintemarie.fr`

### Dans Vercel :

1. Dashboard → Project Settings
2. **Domains**
3. Ajouter : `paroisse-saintemarie.fr`
4. Suivre les instructions pour les DNS

### Mettre à jour la variable d'environnement :

1. Project Settings → Environment Variables
2. Modifier `ALLOWED_ORIGIN`
3. Remplacer par : `https://paroisse-saintemarie.fr`
4. Redéployer : faire un `git push` ou cliquer "Redeploy"

## 📝 Modifier le site

Après chaque changement :

```powershell
git add .
git commit -m "Description du changement"
git push origin main
```

Vercel redéploiera **automatiquement** ! ✨

## 🔍 Voir les logs

Si quelque chose ne fonctionne pas :

1. Vercel Dashboard → Deployments
2. Cliquer sur le dernier deployment
3. **Logs** → Voir les erreurs

## 🆘 Problèmes courants

### ❌ "N8N_WEBHOOK_URL not defined"

- Vérifier les variables d'env dans Vercel
- Attendre 1 minute (délai de propagation)
- Redéployer : `git push origin main`

### ❌ Le formulaire ne répond pas

- Ouvrir la console navigateur : `F12`
- Onglet **Console**
- Vérifier les messages d'erreur
- Voir `SECURITY.md` pour le dépannage

### ❌ CORS error

- Vérifier `ALLOWED_ORIGIN` = votre domaine exact
- Inclure `https://` (obligatoire)
- Pas de `/` à la fin

## 📚 Fichiers importants

- `index.html` → Votre site
- `api/contact.js` → Formulaire proxy
- `api/chat.js` → Chat Spirit proxy
- `vercel.json` → Configuration Vercel
- `.env.example` → Template variables
- `DEPLOYMENT.md` → Guide complet
- `SECURITY.md` → Guide de sécurité

## 🎓 Prochaines étapes

### Pour plus de sécurité :

1. Lire `SECURITY.md`
2. Ajouter un Secret N8N
3. Configurer la validation IP

### Pour les mises à jour :

1. Modifier `index.html` ou les fichiers
2. Faire un `git push`
3. Vercel redéploiera automatiquement

### Pour l'analytics :

1. Aller sur Vercel Analytics
2. Voir le trafic du site en temps réel

---

**Félicitations ! 🎉**

Votre site de la Paroisse Sainte Marie est maintenant en ligne et sécurisé !

*Besoin d'aide ? Voir `DEPLOYMENT.md` ou `SECURITY.md`*
