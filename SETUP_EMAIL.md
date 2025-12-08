# Configuration de l'envoi d'emails avec Resend

## Étapes pour configurer l'envoi d'emails

### 1. Créer un compte Resend (GRATUIT)

1. Allez sur [resend.com](https://resend.com/)
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Le plan gratuit permet d'envoyer **3,000 emails/mois** - largement suffisant pour un site de contact

### 2. Obtenir votre clé API

1. Une fois connecté, allez dans **API Keys** dans le menu latéral
2. Cliquez sur **"Create API Key"**
3. Donnez-lui un nom (par exemple "B2dev Contact Form")
4. Sélectionnez les permissions "Sending access"
5. Cliquez sur **"Add"**
6. **COPIEZ** la clé API qui s'affiche (vous ne pourrez la voir qu'une fois !)

### 3. Configurer la clé API dans votre projet

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez `your_resend_api_key_here` par votre clé API :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Sauvegardez le fichier

### 4. Redémarrer le serveur de développement

```bash
npm run dev
```

### 5. Tester le formulaire

1. Allez sur la page Contact
2. Remplissez le formulaire et envoyez
3. Vous devriez recevoir l'email à **AmauryAll.b2dev@gmail.com**

## Note importante

⚠️ **Pour la production** : Vous devrez ajouter et vérifier votre propre domaine dans Resend pour envoyer des emails depuis `contact@votredomaine.com` au lieu de `onboarding@resend.dev`.

### Pour ajouter votre domaine :

1. Dans Resend, allez dans **Domains**
2. Cliquez sur **"Add Domain"**
3. Entrez votre nom de domaine (ex: b2dev.fr)
4. Suivez les instructions pour ajouter les enregistrements DNS (MX, TXT, etc.)
5. Une fois vérifié, modifiez le fichier `app/api/send-email/route.ts` :

```typescript
from: 'B2dev Contact <contact@votredomaine.com>',
```

## Tarifs Resend

- **Gratuit** : 3,000 emails/mois
- **Pro** ($20/mois) : 50,000 emails/mois
- **Enterprise** : Tarif sur mesure

Pour un site de contact, le plan gratuit est largement suffisant !
