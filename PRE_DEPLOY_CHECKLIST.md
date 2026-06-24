# ✅ Pre-Deployment Checklist

**Avant de mettre votre site en production sur Vercel, vérifier cette liste.**

## 🔐 Sécurité

### Webhooks & URLs

- [ ] N8N_WEBHOOK_URL configurée dans Vercel (non en clair dans le code)
- [ ] N8N_CHAT_WEBHOOK_URL configurée dans Vercel
- [ ] `.env` et `.env.local` sont dans `.gitignore` (jamais committés)
- [ ] Pas d'URLs N8N exposées dans le code frontend
- [ ] URLs validées et testées localement

### Validation & Sanitization

- [ ] Validation email implémentée
- [ ] Limite de caractères appliquée (5000 max)
- [ ] Champs requis validés côté serveur
- [ ] Entrées nettoyées (trim, substring)
- [ ] XSS prevention : pas de `innerHTML` avec user input

### Rate Limiting

- [ ] Rate limiting côté client (5 req/min) ✅
- [ ] Rate limiting côté serveur ✅
- [ ] Vérification IP & hachage ✅

### Headers & CORS

- [ ] CORS configuré avec ALLOWED_ORIGIN
- [ ] Headers de sécurité présents (HSTS, X-Frame-Options)
- [ ] Content-Type: application/json validé
- [ ] Pas de credentiales sensibles en headers

### HTTPS

- [ ] Certificat SSL/TLS valide ✅ (Vercel)
- [ ] Redirection HTTP → HTTPS ✅ (Vercel)
- [ ] Pas de contenu mixte (HTTP + HTTPS)

### Secrets

- [ ] Pas de secrets/tokens en clair dans le code
- [ ] Variables d'env utilisées pour tous les secrets
- [ ] `.env.example` fourni (sans vraies valeurs)
- [ ] Github tokens/API keys NOT committed

---

## 🧪 Fonctionnalité

### Frontend

- [ ] Formulaire contact fonctionne
- [ ] Validation formulaire visible à l'utilisateur
- [ ] Messages d'erreur clairs
- [ ] Messages de succès confirmés
- [ ] Modal contact s'ouvre/ferme correctement
- [ ] Chat bubble visible en bas à droite
- [ ] Chat widget s'ouvre/ferme correctement
- [ ] Responsive design testé (desktop + mobile)
- [ ] Pas de console errors (F12)

### Backend API

- [ ] `/api/contact` répond avec 200
- [ ] `/api/chat` répond avec 200
- [ ] `/api/health` répond (vérifier endpoint)
- [ ] Validation côté serveur fonctionne
- [ ] Erreurs gérées gracieusement
- [ ] Logs serveur visibles dans Vercel

### N8N Integration

- [ ] Webhook contact reçoit les données
- [ ] Webhook chat reçoit les messages
- [ ] N8N retourne les réponses correctement
- [ ] Email de confirmation fonctionne
- [ ] Données sauvegardées correctement

### Performance

- [ ] Page se charge < 2s
- [ ] Formulaire envoie < 500ms
- [ ] Chat répond < 3s (tolérable)
- [ ] Pas de memory leaks (DevTools)

---

## 📋 Configuration

### Vercel

- [ ] Projet créé sur Vercel
- [ ] Connecté à GitHub repository
- [ ] Build command: `npm run build`
- [ ] Deployments auto sur git push ✅
- [ ] Environment variables configurées
- [ ] Custom domain configuré (optionnel)

### Environnement

- [ ] Node.js 18.x installé localement
- [ ] npm install exécuté
- [ ] package.json existe avec les dépendances
- [ ] .gitignore configuré correctement

### Domaine (optionnel)

- [ ] Domaine personnalisé acheté
- [ ] DNS pointé vers Vercel
- [ ] ALLOWED_ORIGIN mis à jour avec bon domaine
- [ ] Certificat SSL auto-généré par Vercel
- [ ] Redirection www → apex domain (optionnel)

---

## 🧹 Nettoyage Code

### Frontend

- [ ] Pas de `console.log()` de debug
- [ ] Pas de commentaires sensibles
- [ ] Code formaté et indentable
- [ ] Pas de fichiers temporaires/test
- [ ] CSS minifié (optionnel)
- [ ] JS minifié/bundled (optionnel)

### Backend

- [ ] Pas de `console.log()` sensibles
- [ ] Pas de secrets en commentaires
- [ ] Code formaté et lisible
- [ ] Erreurs loggées proprement (pas sur console)
- [ ] Pas de fichiers de dev

### Git

- [ ] Pas de fichiers inutiles committed
- [ ] `.gitignore` correct (node_modules, .env, etc)
- [ ] Commit messages significatifs
- [ ] Pas de merge conflicts
- [ ] Branche main est propre

---

## 📚 Documentation

- [ ] README.md existe et est à jour
- [ ] QUICK_START.md prêt pour les utilisateurs
- [ ] DEPLOYMENT.md complet
- [ ] SECURITY.md documenté
- [ ] ARCHITECTURE.md explicite
- [ ] LOCAL_DEV.md fourni
- [ ] Comments code pour logique complexe

---

## 🧪 Tests

### Formulaire Contact

- [ ] Envoyer avec données valides → succès
- [ ] Envoyer sans email → erreur
- [ ] Envoyer email invalide → erreur
- [ ] Envoyer 6 fois en 1 min → rate limit
- [ ] Message > 5000 chars → erreur serveur
- [ ] Page recharge sans erreur

### Chat Spirit

- [ ] Envoyer message → réponse reçue
- [ ] Message vide → rien n'est envoyé
- [ ] Message > 1000 chars → tronqué/validé
- [ ] Chat bubble reste visible
- [ ] Fermer chat → state gardé
- [ ] Multiples messages → tous visibles

### Responsivité

- [ ] Desktop (1920px) → OK
- [ ] Tablet (768px) → OK
- [ ] Mobile (375px) → OK
- [ ] Formulaire sur mobile → utilisable
- [ ] Chat sur mobile → utilisable

### Navigateurs

- [ ] Chrome/Edge → OK
- [ ] Firefox → OK
- [ ] Safari → OK
- [ ] Mobile Safari → OK

---

## 🔍 Audit Final

### Code Quality

```bash
# Vérifier pas d'erreurs
npm run build  # ✅ Doit réussir

# Vérifier la structure
vercel dev    # ✅ Doit marcher localement
```

### Vercel Deployment

- [ ] Preview deployment visité et testé
- [ ] Erreurs dans logs addressées
- [ ] Performance acceptable
- [ ] Pas de avertissements de sécurité

### N8N Verification

- [ ] Webhook configuré en production
- [ ] Test webhook reçoit les données
- [ ] Réponses retournées correctement
- [ ] Logs N8N vérifiés

---

## 🚀 Deployment Day

### Avant de pousser

- [ ] Tous les items ci-dessus ✅
- [ ] Backup de la config N8N
- [ ] Plan de rollback identifié
- [ ] Équipe informée (optionnel)

### Le push

```bash
git add .
git commit -m "Deploy: production release v1.0"
git push origin main

# Attendre que Vercel redéploie
# → Vérifier https://vercel.com/deployments
# → Cliquer sur le deployment → Logs
# → Voir "Production" badge vert ✅
```

### Après le déploiement

- [ ] Visiter le site en production
- [ ] Tester formulaire complet
- [ ] Tester chat complet
- [ ] Vérifier logs Vercel
- [ ] Vérifier logs N8N
- [ ] Partager le lien avec l'équipe
- [ ] Monitorer les premières heures

---

## 🎉 Go Live!

Une fois tous les items cochés :

✅ Votre site est en production
✅ Formulaires fonctionnels
✅ Chat opérationnel
✅ Webhooks sécurisés
✅ Monitoring actif

---

## 📞 Support

Si quelque chose ne fonctionne pas :

1. **Vérifier les logs Vercel** : Dashboard → Deployments → Logs
2. **Vérifier les logs N8N** : Workflows → Executions
3. **Voir la console navigateur** : F12 → Console
4. **Consulter le guide** : DEPLOYMENT.md ou SECURITY.md

---

**Prêt à déployer? 🚀**

Faire un dernier check des items et pousser vers production!

*Créé pour la Paroisse Indépendante Orthodoxe Sainte Marie*
