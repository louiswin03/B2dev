# Guide de déploiement avec Sanity

## 🚀 Déploiement sur Vercel (ou Netlify)

### 1. Préparer les variables d'environnement

Sur Vercel/Netlify, ajoutez ces variables :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=asvyr7h9
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Déployer le site

```bash
# Via Vercel
vercel

# Ou connectez votre repo GitHub à Vercel
# Le site sera accessible sur : https://votre-site.vercel.app
```

### 3. Accès au Studio pour le client

Une fois déployé, le Studio est accessible sur :
```
https://votre-site.vercel.app/studio
```

**Donnez accès à votre client :**

1. Allez sur https://sanity.io/manage
2. Sélectionnez votre projet
3. API → CORS Origins
4. Ajoutez votre domaine : `https://votre-site.vercel.app`
5. Members → Invite member
6. Invitez votre client avec son email
7. Donnez-lui le rôle **"Editor"** ou **"Administrator"**

### 4. Configurer les webhooks (optionnel mais recommandé)

Pour que les changements apparaissent instantanément :

#### A. Créer une route API Next.js pour la revalidation

Créez `app/api/revalidate/route.ts` :

```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  // Vérifier le secret pour sécuriser l'endpoint
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const type = body._type

    // Revalider les pages selon le type de contenu modifié
    switch (type) {
      case 'project':
        revalidatePath('/realisations')
        break
      case 'service':
      case 'faq':
        revalidatePath('/services')
        break
      case 'teamMember':
      case 'timeline':
        revalidatePath('/apropos')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
```

#### B. Ajouter le secret dans Vercel

Variables d'environnement Vercel :
```bash
REVALIDATE_SECRET=votre_secret_aleatoire_123456
```

#### C. Configurer le webhook dans Sanity

1. https://sanity.io/manage
2. Votre projet → API → Webhooks
3. **Create webhook** :
   - Name : `Revalidate Vercel`
   - URL : `https://votre-site.vercel.app/api/revalidate?secret=votre_secret_aleatoire_123456`
   - Dataset : `production`
   - Trigger on : `Create`, `Update`, `Delete`
   - Document types : Sélectionnez tous vos types

**Résultat** : Quand votre client publie du contenu, Sanity envoie un webhook → Vercel revalide la page → Le site affiche les nouvelles données en 1-2 secondes !

## 🎯 Workflow en production

### Pour votre client (une fois tout configuré) :

1. **Il va sur** : `https://votre-site.com/studio`
2. **Il se connecte** avec son compte Sanity
3. **Il modifie** un projet, un service, une FAQ, etc.
4. **Il clique sur "Publish"**
5. **Le site se met à jour automatiquement** (grâce au webhook)

### Avantages :

✅ **Pas besoin de redéployer** le site pour chaque modification
✅ **Modifications en temps réel** (1-2 secondes)
✅ **Interface simple** pour le client (pas de code)
✅ **Historique des versions** (peut revenir en arrière)
✅ **Plusieurs éditeurs** peuvent travailler en même temps
✅ **Preview des modifications** avant publication

## 🔒 Sécurité

- Le Studio nécessite une connexion Sanity (sécurisé par défaut)
- Seules les personnes invitées peuvent modifier
- Les données sont stockées dans le cloud Sanity (sécurisé)
- Vous contrôlez les permissions (Editor, Administrator, etc.)

## 💰 Coûts

**Sanity gratuit jusqu'à :**
- 3 utilisateurs
- 10 000 documents
- 5 GB de fichiers
- 500 000 requêtes API/mois

Pour un site vitrine/portfolio, c'est **largement suffisant** et **totalement gratuit**.

## 📱 Exemple de workflow client

**Scénario : Le client veut ajouter un nouveau projet**

1. Va sur `votre-site.com/studio`
2. Se connecte
3. Clique sur "Projet Portfolio" → "Create new"
4. Remplit :
   - Titre : "Nouveau site e-commerce"
   - Description : "Boutique en ligne..."
   - Tags : "E-commerce", "Stripe", "React"
   - Upload des images
5. Clique "Publish"
6. **2 secondes plus tard** → Le projet apparaît sur le site !

**Aucune manipulation technique nécessaire !**

## 🆘 Support client

Pour former votre client, vous pouvez :
- Créer un court tutoriel vidéo (5 min)
- Lui montrer une fois en screen sharing
- Lui envoyer ce guide

C'est très intuitif, il comprendra en 5 minutes.

## 🔗 Ressources

- Studio Sanity : `https://votre-site.com/studio`
- Gestion Sanity : https://sanity.io/manage
- Documentation : https://www.sanity.io/docs

---

**En résumé** : Votre client n'a besoin que d'un navigateur et d'accéder à `/studio` sur votre site. Tout est géré dans le cloud, aucune installation locale nécessaire.
