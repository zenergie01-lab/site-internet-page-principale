# 🔧 Commandes essentielles

**Tous les commandements dont vous avez besoin** (PowerShell sur Windows)

## 🚀 Déploiement initial

### 1. Initialiser Git

```powershell
cd "C:\Users\Vince\Documents\ASSO ORTHODOXE\site internet page principale"
git init
git config user.name "Votre Nom"
git config user.email "votre@email.com"
```

### 2. Premier commit

```powershell
git add .
git commit -m "Paroisse Sainte Marie - Initial setup"
```

### 3. Ajouter remote GitHub

```powershell
git remote add origin https://github.com/VOTRE_USERNAME/paroisse-sainte-marie.git
git branch -M main
git push -u origin main
```

## 📝 Modifications & Mises à jour

### Ajouter des changements

```powershell
# Tous les fichiers modifiés
git add .

# OU fichiers spécifiques
git add index.html
git add api/contact.js
```

### Commiter

```powershell
git commit -m "Description courte du changement"
```

### Pousser (déclenche Vercel redeploy)

```powershell
git push origin main
```

### Combiné (ajouter + commiter + pousser)

```powershell
git add . && git commit -m "Description" && git push origin main
```

## 🐛 Développement local

### Installer Vercel CLI

```powershell
npm install -g vercel
```

### Installer les dépendances

```powershell
npm install
```

### Lancer le serveur de dev

```powershell
vercel dev
```

**Output attendu** :
```
Ready! Available at http://localhost:3000
```

### Arrêter le serveur

```powershell
# Ctrl + C dans le terminal
```

## 🔍 Vérification & Debug

### Vérifier Git status

```powershell
git status
```

**Output** :
```
On branch main
Changes not staged for commit:
  modified:   index.html
  new file:   api/newfile.js
```

### Voir historique commits

```powershell
git log --oneline
```

**Output** :
```
abc1234 (HEAD -> main) Fix: formulaire validation
def5678 Feat: add chat widget
ghi9012 Initial setup
```

### Voir changements détaillés

```powershell
git diff
```

### Voir changements d'un fichier

```powershell
git diff index.html
```

## 🆘 Dépannage

### Annuler les changements (avant commit)

```powershell
# Annuler un fichier
git checkout index.html

# Annuler tous les changements
git checkout .
```

### Voir quels fichiers suivre

```powershell
# Status détaillé
git status

# Voir les untracked files
git status --short
```

### Voir la dernière version d'un fichier

```powershell
git show HEAD:index.html
```

### Supprimer un fichier du tracking (garde le fichier local)

```powershell
git rm --cached api/test.js
```

## 🌐 Variables d'environnement

### Créer .env.local

```powershell
# Ouvrir éditeur
notepad .env.local
```

**Contenu** :
```
N8N_WEBHOOK_URL=https://n8n.srv999617.hstgr.cloud/webhook/TESTASSO
N8N_CHAT_WEBHOOK_URL=https://n8n.srv999617.hstgr.cloud/webhook/dd293465-959d-4c3a-94ee-f5c9a632bde7/chat
ALLOWED_ORIGIN=http://localhost:3000
```

### Vérifier que .env.local existe

```powershell
Get-Content .env.local
```

## 📦 Node.js & npm

### Vérifier les versions

```powershell
node --version
npm --version
```

**Requis** : Node.js 18+ (npm 9+)

### Installer les dépendances

```powershell
npm install
```

### Mettre à jour npm

```powershell
npm install -g npm@latest
```

### Vérifier les dépendances obsolètes

```powershell
npm outdated
```

## 🧹 Nettoyage

### Supprimer node_modules (ne pas commiter!)

```powershell
Remove-Item -Recurse -Force node_modules
npm install  # Réinstaller
```

### Vider le cache npm

```powershell
npm cache clean --force
```

### Supprimer fichiers temporaires

```powershell
# Supprimer .env.local (ne pas commiter)
Remove-Item .env.local

# Vérifier qu'il n'est pas tracked
git status
```

## 📋 Avant de déployer

### Vérifier que tout est commité

```powershell
git status

# Doit afficher: "working tree clean"
```

### Vérifier les commits non pushés

```powershell
git log origin/main..main

# Doit afficher les commits locaux non encore poussés
```

### Pousser tous les commits

```powershell
git push origin main
```

## 🚀 Après déploiement

### Vérifier le deployment Vercel

```powershell
# Ouvrir directement
start "https://vercel.com/dashboard"
```

### Voir les logs Vercel

```powershell
# CLI Vercel (si installé)
vercel logs

# Ou via web: https://vercel.com/dashboard
```

## 🔄 Workflow complet pour une modification

```powershell
# 1. Vérifier le status
git status

# 2. Faire la modification dans l'éditeur
# (modifier index.html, etc)

# 3. Vérifier les changements
git diff

# 4. Ajouter les fichiers
git add .

# 5. Commiter
git commit -m "Description du changement"

# 6. Pousser (déclenche redeploy)
git push origin main

# 7. Attendre quelques secondes et vérifier Vercel
# https://vercel.com/dashboard
```

## 📞 Commandes utiles supplémentaires

### Renommer une branche locale

```powershell
git branch -m anciennom nouveaunom
```

### Supprimer une branche locale

```powershell
git branch -d branchname
```

### Créer une nouvelle branche

```powershell
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### Retourner à main

```powershell
git checkout main
```

### Voir toutes les branches

```powershell
git branch -a
```

### Merger une branche

```powershell
git checkout main
git merge feature/ma-nouvelle-fonctionnalite
```

## 🔐 Sécurité Git

### Vérifier que .env n'est pas tracked

```powershell
git ls-files | Select-String ".env"

# Ne doit rien afficher
```

### Vérifier que .gitignore est correct

```powershell
Get-Content .gitignore
```

**Doit contenir** :
```
.env
.env.local
node_modules/
```

### Supprimer un fichier du historique (avancé)

```powershell
# ⚠️ Dangereux! Utilisez avec prudence
git rm --cached api/secret.js
echo "api/secret.js" >> .gitignore
git commit -m "Remove secret file"
git push origin main
```

## 💡 Tips & Tricks

### Alias pour commandes courtes

```powershell
# Dans PowerShell profile
function ga { git add . }
function gc { param($msg) git commit -m $msg }
function gp { git push origin main }
function gs { git status }
```

### Combiné en une seule ligne

```powershell
git add . ; git commit -m "Changes" ; git push origin main
```

### Voir les fichiers modifiés en couleur

```powershell
git status --short
# M  = Modified
# A  = Added
# D  = Deleted
# ??  = Untracked
```

### Ignorer les changements d'un fichier temporairement

```powershell
git update-index --skip-worktree api/test.js

# Pour arrêter d'ignorer:
git update-index --no-skip-worktree api/test.js
```

## 📖 Aide

### Aide générale Git

```powershell
git --help
git commit --help
```

### Manuel complet

```powershell
git help git
```

---

## 🚀 Déploiement rapide (one-liner)

```powershell
git add . ; git commit -m "Update" ; git push origin main ; Write-Host "✅ Deployed! Check https://vercel.com/dashboard"
```

## ✅ Checklist avant de pousser

```powershell
# 1. Vérifier le status
git status
# → "working tree clean"

# 2. Voir les changements
git diff

# 3. Commiter avec message clair
git commit -m "Feat: add new feature"

# 4. Pousser
git push origin main

# 5. Vérifier Vercel
# https://vercel.com/dashboard
```

---

**Prêt à commencer? Les commandes essentielles sont ci-dessus! 🚀**

*Pour plus d'aide: `git help` ou `DEPLOYMENT.md`*
