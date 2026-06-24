# 🎯 START HERE - Début rapide

**Vous venez d'arriver? Commencez par ici! ⬇️**

---

## 🚀 3 étapes pour déployer (15 minutes)

### ✅ Étape 1: GitHub (5 min)

1. Aller sur https://github.com/signup (créer compte si besoin)
2. Créer nouveau repository:
   - Nom: `paroisse-sainte-marie`
   - Description: "Site officiel de la Paroisse Sainte Marie"
   - Public ou Private (à vous de choisir)
   - Cliquer **Create repository**

3. Ouvrir PowerShell ici:
```powershell
cd "C:\Users\Vince\Documents\ASSO ORTHODOXE\site internet page principale"
git init
git config user.name "Votre Nom"
git config user.email "votre@email.com"
git add .
git commit -m "Initial commit"
```

4. Suivre les instructions GitHub:
```powershell
git remote add origin https://github.com/VOTRE_USERNAME/paroisse-sainte-marie.git
git branch -M main
git push -u origin main
```

### ✅ Étape 2: Vercel (5 min)

1. Aller sur https://vercel.com/signup
2. Cliquer **"Continue with GitHub"**
3. Autoriser Vercel
4. Dashboard → **"Add New..." → "Project"**
5. Sélectionner `paroisse-sainte-marie`
6. Cliquer **"Import"**

**IMPORTANT**: Ajouter variables d'environnement:

| Clé | Valeur |
|-----|--------|
| `N8N_WEBHOOK_URL` | `https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO` |
| `N8N_CHAT_WEBHOOK_URL` | `https://n8n.srv999617.hstgr.cloud/webhook/dd293465-959d-4c3a-94ee-f5c9a632bde7/chat` |
| `ALLOWED_ORIGIN` | `https://paroisse-sainte-marie.vercel.app` |

7. Cliquer **"Deploy"**
8. Attendre 2-3 minutes ⏳

### ✅ Étape 3: Tester! (5 min)

1. Une fois déployé, cliquer le lien: `https://paroisse-sainte-marie.vercel.app`
2. Scroller jusqu'à **"Entrez en Contact"**
3. Cliquer **"Formulaire de Contact"**
4. Remplir et tester → Devrait fonctionner! ✅
5. Tester le chat bubble en bas à droite 💬

**🎉 Vous l'avez fait! Votre site est en ligne!**

---

## 📚 Documentation par besoin

### 🏃 Je dois juste déployer vite
**→ Lire**: `QUICK_START.md`

### 🤔 Je ne sais pas par où commencer
**→ Lire**: `INDEX.md` (guide pour tous les autres guides)

### 🖥️ Je veux développer/modifier
**→ Lire**: `LOCAL_DEV.md`

### 🛡️ Je suis préoccupé par la sécurité
**→ Lire**: `SECURITY.md`

### 🏗️ Je veux comprendre le système
**→ Lire**: `ARCHITECTURE.md`

### ✅ Avant d'aller en production
**→ Faire**: `PRE_DEPLOY_CHECKLIST.md`

### 📋 J'ai besoin des commandes
**→ Lire**: `COMMANDS.md`

---

## ❓ FAQ rapides

### Q: Ça va coûter cher?
**A**: Non! Vercel = gratuit pour les petits sites.

### Q: C'est sécurisé?
**A**: Oui! Les URLs N8N sont complètement masquées. Voir `SECURITY.md`.

### Q: Je peux changer le design?
**A**: Oui! Modifier `index.html` et faire `git push`.

### Q: Où je mets mon domaine personnalisé?
**A**: Dans Vercel Project Settings → Domains. Voir `DEPLOYMENT.md`.

### Q: Ça redéploie automatiquement?
**A**: Oui! Chaque `git push` déclenche un redeploy automatique.

### Q: Que faire si ça casse?
**A**: Voir les logs Vercel Dashboard → Deployments → Logs.

### Q: Comment j'update après le déploiement?
**A**: Modifier les fichiers → `git push` → Redeploy auto!

---

## 🎯 Points clés à retenir

✅ **Webhooks N8N masqués**: Client n'y accède pas directement
✅ **Validation côté serveur**: Tous les inputs vérifiés
✅ **Rate limiting**: Protection contre les abus
✅ **Auto-deploy**: Chaque git push redéploie
✅ **Monitoring gratuit**: Logs Vercel en temps réel

---

## 🚦 Après le déploiement

### ✅ Site en ligne
- URL: `https://paroisse-sainte-marie.vercel.app`
- Formulaire fonctionne: **Testé ✅**
- Chat fonctionne: **Testé ✅**

### 📈 Mettre à jour le site

Exemple: Changer le titre de la page

```powershell
# 1. Modifier le fichier
notepad index.html
# (Editer le titre)

# 2. Sauvegarder (Ctrl+S)

# 3. Dans PowerShell
git add index.html
git commit -m "Change: update page title"
git push origin main

# 4. Attendre 30 secondes
# 5. Rafraîchir le site dans navigateur (F5)
# → Changement visible! ✅
```

### 🌐 Domaine personnalisé (Optionnel)

1. Acheter un domaine (Godaddy, OVH, etc)
2. Vercel Dashboard → Project Settings → Domains
3. Ajouter votre domaine
4. Suivre les instructions DNS
5. Vercel configure automatiquement HTTPS

---

## 🎓 Prochaines étapes

### Pour les curieux
- Lire `ARCHITECTURE.md` pour comprendre le système complet
- Lire `SECURITY.md` pour les détails de sécurité

### Pour les développeurs
- Installer Node.js
- Lancer `vercel dev` localement
- Modifier le code et tester avant de pousser

### Pour les administrateurs
- Monitorer Vercel Dashboard
- Vérifier les logs N8N
- Gérer les mises à jour

---

## 📞 Besoin d'aide?

### Erreur lors du déploiement
→ Voir **Vercel Dashboard** → **Deployments** → Cliquer le deployment → **Logs**

### Formulaire ne fonctionne pas
→ Ouvrir **F12** (DevTools) → Onglet **Console** → Voir les erreurs

### Chat ne répond pas
→ Vérifier que N8N webhooks sont configurés correctement

### Plus de détails
→ Consulter les fichiers de doc : `DEPLOYMENT.md`, `SECURITY.md`, etc.

---

## 📋 Liste de vérification finale

- [ ] Repository GitHub créé
- [ ] Code pushé vers GitHub
- [ ] Vercel project créé
- [ ] Variables d'env configurées
- [ ] Site déployé et accessible
- [ ] Formulaire testé
- [ ] Chat testé
- [ ] Logs Vercel vérifiés

✅ **Si tout est coché, vous êtes prêt!**

---

## 🎉 Félicitations!

Vous avez:
✅ Créé un site sécurisé
✅ Intégré des webhooks N8N
✅ Déployé sur une infrastructure scalable
✅ Implémenté des mesures de sécurité

**La Paroisse Sainte Marie est maintenant en ligne!** 🙏

---

## 🔗 Liens utiles

- **Votre site**: https://paroisse-sainte-marie.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **N8N Docs**: https://docs.n8n.io/

---

**Bienvenue dans l'aventure numérique de la Paroisse! 🌟**

*✝️ Patriarcat Marial · Fondée le 18 Mars 2024*

*Que la protection de la Sainte Mère de Dieu accompagne ce projet. Amen. 🙏*
