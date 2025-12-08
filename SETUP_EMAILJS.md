# Configuration EmailJS pour le formulaire de contact

## 📧 EmailJS est maintenant configuré !

Votre formulaire de contact utilise désormais EmailJS au lieu de Resend.

## 🔑 Récupérer vos clés EmailJS

### 1. Service ID

1. Allez sur [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Connectez-vous à votre compte
3. Cliquez sur **"Email Services"** dans le menu de gauche
4. Vous verrez votre service (ex: Gmail, Outlook, etc.)
5. Cliquez sur votre service
6. Copiez le **Service ID** (format: `service_xxxxxxx`)

### 2. Template ID

1. Dans le dashboard EmailJS, cliquez sur **"Email Templates"**
2. Vous devriez voir votre template avec les variables:
   - `{{firstname}}`
   - `{{lastname}}`
   - `{{emaill}}` (avec 2 'l')
   - `{{time}}`
   - `{{subject}}`
   - `{{service}}`
   - `{{message}}`
3. Cliquez sur votre template
4. Copiez le **Template ID** (format: `template_xxxxxxx`)

### 3. Public Key

1. Cliquez sur **"Account"** dans le menu de gauche
2. Allez dans l'onglet **"General"**
3. Vous verrez votre **Public Key** (format: chaîne de caractères)
4. Copiez cette clé

## 📝 Configurer votre `.env.local`

Ouvrez le fichier `.env.local` à la racine du projet et remplacez les valeurs :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key_ici
```

⚠️ **IMPORTANT** : Ces clés doivent commencer par `NEXT_PUBLIC_` pour être accessibles côté client dans Next.js.

## 🔄 Redémarrer le serveur

Après avoir modifié le `.env.local`, redémarrez votre serveur de développement :

```bash
npm run dev
```

## ✅ Tester le formulaire

1. Allez sur `/contact`
2. Remplissez le formulaire
3. Cliquez sur "Envoyer le message"
4. Vous devriez recevoir l'email à l'adresse configurée dans EmailJS

## 📊 Variables envoyées au template

Le formulaire envoie automatiquement ces variables à votre template EmailJS :

| Variable dans le template | Description |
|---------------------------|-------------|
| `{{firstname}}` | Prénom du contact |
| `{{lastname}}` | Nom du contact |
| `{{emaill}}` | Email du contact (notez les 2 'l') |
| `{{time}}` | Date et heure de l'envoi (généré automatiquement) |
| `{{subject}}` | Sujet sélectionné (Demande de devis, Renseignement, Autre) |
| `{{service}}` | Service sélectionné (Vitrine, Pro, Personnalisé, Autre) |
| `{{message}}` | Message du contact |

## 🎯 Avantages d'EmailJS

- ✅ **Gratuit** : 200 emails/mois
- ✅ **Simple** : Pas besoin d'API backend
- ✅ **Sécurisé** : Les clés publiques ne sont pas sensibles
- ✅ **Flexible** : Supporte Gmail, Outlook, etc.

## 🚨 Dépannage

### Le formulaire ne s'envoie pas ?

1. Vérifiez que vous avez bien redémarré le serveur après avoir modifié `.env.local`
2. Vérifiez que les 3 clés sont correctes dans le dashboard EmailJS
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez que votre service email est bien connecté et vérifié dans EmailJS

### Erreur "Public Key is required" ?

- Assurez-vous d'avoir bien ajouté `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` dans `.env.local`
- La clé doit commencer par `NEXT_PUBLIC_`

### L'email n'arrive pas ?

1. Vérifiez vos **spams**
2. Dans EmailJS dashboard, allez dans "Email Services" et vérifiez que le service est bien connecté
3. Testez votre template directement depuis le dashboard EmailJS

## 📚 Documentation officielle

[Documentation EmailJS](https://www.emailjs.com/docs/)
