# Guide d'installation Sanity pour B2dev

## 1. Configuration initiale

### Obtenir vos identifiants Sanity

1. Allez sur https://sanity.io/manage
2. Créez un nouveau projet (ou sélectionnez-en un existant)
3. Notez votre **Project ID** (visible dans les paramètres)
4. Le **Dataset** est généralement `production`

### Configurer les variables d'environnement

Éditez le fichier `.env.local` et remplacez :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## 2. Accéder au Studio Sanity

### Démarrer le serveur Next.js
```bash
npm run dev
```

### Accéder au Studio
Ouvrez votre navigateur et allez sur : **http://localhost:3000/studio**

Vous devrez vous connecter avec votre compte Sanity.

## 3. Structure du contenu

Le Studio est configuré avec les types de contenu suivants :

### 📁 Projet Portfolio
- **Titre** : Nom du projet
- **Slug** : URL-friendly identifier
- **Description** : Description du projet
- **Image principale** : Image de couverture
- **Galerie** : Plusieurs images du projet
- **Tags** : Technologies utilisées
- **URL du projet** : Lien vers le site
- **Ordre** : Position dans la liste
- **Publié** : Visible ou non

### 💼 Service/Offre
- **Titre** : Nom de l'offre (ex: "Site Vitrine")
- **Sous-titre** : Phrase d'accroche
- **Prix** : Prix affiché
- **Description** : Détails de l'offre
- **Fonctionnalités** : Liste des features incluses
- **Offre recommandée** : Badge "Recommandé"
- **Couleur** : Couleur du badge
- **Ordre** : Position dans la liste
- **Publié** : Visible ou non

### ❓ FAQ
- **Question** : La question
- **Réponse** : La réponse
- **Couleur** : Couleur de l'icône
- **Ordre** : Position dans la liste
- **Publié** : Visible ou non

### 👥 Membre de l'équipe
- **Nom** : Nom complet
- **Rôle** : Poste/titre
- **Biographie** : Présentation
- **Photo** : Photo de profil
- **Compétences** : Liste des skills
- **Réseaux sociaux** : LinkedIn, GitHub, Twitter
- **Ordre** : Position dans la liste
- **Publié** : Visible ou non

### 📅 Parcours/Timeline
- **Titre** : Poste ou formation
- **Organisation** : Entreprise ou école
- **Période** : Dates (ex: "2020-2023")
- **Description** : Détails
- **Type** : Formation / Expérience / Projet
- **Ordre** : Position chronologique
- **Publié** : Visible ou non

### 📄 Page légale
- **Titre** : Titre de la page
- **Slug** : URL (ex: "mentions-legales")
- **Contenu** : Contenu riche (texte, titres, listes)
- **Dernière mise à jour** : Date automatique
- **Publié** : Visible ou non

## 4. Importer les données existantes

Pour importer vos données actuelles (hardcodées dans le code) vers Sanity :

### Option 1 : Import manuel (recommandé)
1. Allez sur http://localhost:3000/studio
2. Créez manuellement chaque contenu en copiant les informations actuelles
3. Uploadez les images depuis le dossier `public/images/`

### Option 2 : Script d'import automatique
Un script d'import peut être créé si vous avez beaucoup de contenu à migrer.

## 5. Utiliser les données dans Next.js

### Exemple : Récupérer les projets
```typescript
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'

export default async function RealisationsPage() {
  const projects = await client.fetch(projectsQuery)

  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### Exemple : Afficher une image Sanity
```typescript
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

<Image
  src={urlFor(project.mainImage).url()}
  alt={project.title}
  width={800}
  height={600}
/>
```

## 6. Revalidation automatique

Pour que les modifications Sanity apparaissent immédiatement sur le site, configurez les webhooks :

1. Dans Sanity : Settings > API > Webhooks
2. Créez un webhook vers : `https://votre-site.com/api/revalidate`
3. Ajoutez une route API Next.js pour gérer la revalidation

## 7. Déploiement du Studio

### Option 1 : Studio intégré (actuel)
Le studio est accessible sur `/studio` de votre site Next.js

### Option 2 : Studio séparé
Déployez le studio sur un sous-domaine séparé avec `npx sanity deploy`

## 8. Ressources

- Documentation Sanity : https://www.sanity.io/docs
- Studio Next.js : https://www.sanity.io/plugins/next-sanity
- GROQ Query : https://www.sanity.io/docs/groq

## 9. Prochaines étapes

1. ✅ Configurez vos identifiants Sanity
2. ✅ Accédez au Studio sur /studio
3. ⏳ Importez votre contenu existant
4. ⏳ Mettez à jour vos pages Next.js pour utiliser Sanity
5. ⏳ Configurez les webhooks pour la revalidation
6. ⏳ Déployez en production

Besoin d'aide ? Consultez la documentation ou créez une issue !
