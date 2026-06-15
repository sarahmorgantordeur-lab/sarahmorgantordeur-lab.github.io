# Portfolio de Sarah Tordeur

Portfolio personnel bilingue français/anglais présentant mon parcours de développeuse Full Stack, mes compétences techniques et mes principaux projets, notamment :

- le Master Patient Index réalisé durant mon stage chez Iderys ;
- une initiative personnelle de Medical RAG on-premise fondée sur un index BM25 pur Python ;
- Find My Roof ;
- le site de l'A.S.B.L. mobertaimont.be ;
- une galerie d'art ;
- Family Dashboard ;
- l'ERP et le site vitrine de l'Axel Club.

Le site est développé sans framework frontend ni étape de compilation. Il utilise HTML5, CSS3 et JavaScript natif afin de rester léger, portable et simple à déployer sur un hébergement statique.

Site public : [https://sarahtordeur.dev](https://sarahtordeur.dev)

## Fonctionnalités

### Interface

- design sombre responsive avec grille décorative et accents cyan ;
- navigation fixe avec indication automatique de la section active ;
- menu mobile ;
- animations d'apparition basées sur `IntersectionObserver` ;
- défilement fluide vers les ancres ;
- galeries horizontales pour les captures de projets ;
- visionneuse plein écran avec navigation au clavier ;
- prise en charge de `prefers-reduced-motion` pour limiter les animations.

### Internationalisation

- interface disponible en français et en anglais ;
- sélecteur `FR / EN` dans la barre de navigation ;
- catalogues JSON séparés dans `locales/` ;
- traduction des textes, métadonnées SEO, attributs `aria-label`, textes alternatifs et placeholders ;
- langue sélectionnée enregistrée dans `localStorage` sous la clé `portfolio-language` ;
- français conservé directement dans le HTML comme contenu par défaut et solution de repli sans JavaScript.

### SEO

- titre et description optimisés ;
- URL canonique ;
- métadonnées Open Graph et Twitter Card ;
- données géographiques pour Mons, Belgique ;
- données structurées JSON-LD pour le site, le profil et les projets ;
- `robots.txt` ;
- `sitemap.xml` ;
- textes alternatifs sur les images ;
- hiérarchie de titres structurée.

### Contact

- formulaire avec validation côté client ;
- états de chargement, de succès et d'erreur ;
- envoi prévu via Formspree ;
- coordonnées cliquables pour l'email et le téléphone.

## Architecture technique

```text
Portefolio/
├── assets/
│   ├── art/
│   ├── axel_club/
│   ├── family_dashboard/
│   ├── find_my_roof/
│   ├── iderys_mpi/
│   └── mobertaimont/
├── locales/
│   ├── en.json
│   └── fr.json
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
└── README.md
```

### `index.html`

Contient :

- les métadonnées SEO et sociales ;
- les données structurées JSON-LD ;
- la navigation et le sélecteur de langue ;
- les sections Hero, À propos, Compétences, Projets, Parcours et Contact ;
- les galeries de captures ;
- la modale de visualisation ;
- le formulaire de contact.

Le français est la langue source du document. Les textes techniques et les noms de technologies restent inchangés lorsqu'ils sont identiques dans les deux langues.

### `style.css`

Feuille de style unique contenant :

- les variables de thème ;
- les composants de navigation ;
- les cartes de compétences et de projets ;
- le diagramme visuel du pipeline Medical RAG ;
- les galeries et la modale ;
- la timeline du parcours ;
- le formulaire de contact ;
- les media queries pour tablette et mobile ;
- les règles d'accessibilité liées à la réduction des animations.

### `script.js`

Le JavaScript est organisé en blocs fonctionnels :

1. internationalisation ;
2. effet de navigation au défilement ;
3. menu mobile ;
4. lien actif selon la section visible ;
5. animations d'apparition ;
6. modale et navigation dans les galeries ;
7. validation et envoi du formulaire ;
8. défilement fluide.

Aucune dépendance JavaScript externe n'est requise.

## Fonctionnement de l'i18n

Le moteur i18n est implémenté dans `script.js` sans bibliothèque externe.

### Chargement

Au démarrage :

1. les nœuds textuels du document sont parcourus avec `TreeWalker` ;
2. leur valeur française originale est conservée dans un `WeakMap` ;
3. la langue sauvegardée dans `localStorage` est lue ;
4. le fichier `locales/fr.json` ou `locales/en.json` est chargé avec `fetch()` ;
5. les textes et attributs sont remplacés sans reconstruire le DOM ;
6. l'attribut `lang` de l'élément `<html>` et le titre du document sont actualisés.

Un identifiant de requête empêche une réponse réseau plus lente de remplacer une langue sélectionnée plus récemment.

### Structure d'un catalogue

```json
{
  "locale": "en",
  "documentTitle": "Sarah Tordeur | Full Stack & Medical AI Developer",
  "text": {
    "À propos": "About"
  },
  "attributes": {
    "#subject": {
      "placeholder": "Job opportunity, collaboration..."
    }
  }
}
```

La section `text` utilise le texte français normalisé comme clé. La section `attributes` utilise un sélecteur CSS, puis le nom de l'attribut à traduire.

### Ajouter ou modifier une traduction

1. Modifier le texte source dans `index.html`.
2. Ajouter exactement ce texte comme clé dans `locales/en.json`.
3. Ajouter sa traduction anglaise comme valeur.
4. Pour un attribut, ajouter le sélecteur dans `attributes`.
5. Vérifier que la clé ne contient pas d'espaces ou de retours à la ligne différents du texte normalisé.
6. Servir le site via HTTP et tester les deux langues.

Le fichier `locales/fr.json` contient principalement les versions françaises des métadonnées et attributs. Le contenu français visible reste directement présent dans `index.html`.

## Projet Medical RAG

La carte Medical RAG décrit une initiative personnelle menée pendant le stage chez Iderys.

### Objectif

Interroger localement des documents médicaux en français et produire une réponse extractive sourcée, sans transmettre les données sensibles à un service distant.

### Architecture actuelle

```text
Documents TXT, PDF prétraités ou ressources FHIR
                         |
                         v
Nettoyage, anonymisation et découpage en passages
                         |
                         v
Index inversé BM25 en Python standard
                         |
                         v
Classement lexical des passages dans le top-k
                         |
                         v
SentenceScorer : 8 caractéristiques par phrase
                         |
                         v
NanoNN ou heuristique BM25 + overlap
                         |
                         v
Réponse extractive + sources + avertissement médical
```

### Index BM25 pur Python

La version présentée dans le portfolio n'utilise plus BioBERT, PyTorch, Transformers, FAISS ou IRISVector pour le Medical RAG.

L'index BM25 repose sur :

- un index inversé ;
- la fréquence des termes dans chaque passage ;
- l'Inverse Document Frequency ;
- une correction selon la longueur du document ;
- les paramètres BM25 `k1` et `b` ;
- une implémentation locale basée sur la bibliothèque standard Python.

Forme simplifiée du score :

```text
score(q, d) = somme IDF(t) * TF_normalisé(t, d)
```

### Question-réponse extractive

Le moteur de réponse ne génère pas librement du texte. Il classe et sélectionne les phrases les plus pertinentes dans les passages récupérés.

La documentation du projet indique que `SentenceScorer` exploite huit caractéristiques. Elle en décrit explicitement sept :

1. recouvrement entre les termes de la requête et ceux de la phrase ;
2. similarité de Jaccard ;
3. score BM25 normalisé ;
4. position de la phrase ;
5. longueur de la phrase ;
6. présence de valeurs numériques ;
7. ratio de majuscules.

La huitième caractéristique doit être confirmée directement dans l'implémentation de `models/extractive_qa.py` avant d'être documentée plus précisément.

Les caractéristiques peuvent être traitées par `NanoNN`, un perceptron multi-couches écrit en Python standard. En l'absence de poids entraînés, le système conserve une stratégie heuristique BM25 et overlap.

### Confidentialité

- exécution locale ;
- anonymisation avant indexation ;
- masquage prévu des identifiants, noms, dates et numéros de téléphone ;
- aucune donnée médicale envoyée vers un service cloud ;
- réponse limitée au contexte récupéré ;
- conservation des sources ;
- avertissement indiquant que la réponse ne constitue pas un diagnostic définitif.

### Métriques

Les anciennes métriques issues du prototype vectoriel ne sont plus affichées dans le portfolio. Le nouvel index BM25 doit faire l'objet d'une évaluation distincte avant de publier des valeurs MRR, Recall ou NDCG.

## Projet Master Patient Index

Le projet principal du stage chez Iderys présente une interface Angular destinée à la gestion de dossiers patients et de doublons.

Fonctionnalités présentées :

- authentification et tableau de bord ;
- interface multilingue ;
- listes triables et paginées ;
- CRUD patient ;
- consultation des ressources FHIR liées ;
- affichage des conditions, observations, allergies, rendez-vous et médications ;
- détection et évaluation des doublons ;
- comparaison de dossiers ;
- décision de fusion ou de rejet ;
- historique des décisions ;
- agenda des rendez-vous ;
- recherche vectorielle et scoring dans le contexte propre au projet MPI.

Les technologies mentionnées pour ce projet sont notamment Angular 21, TypeScript, RxJS, Tailwind CSS, FHIR R4, HL7, IRIS for Health, ObjectScript, Sentence-Transformers, Docker et Bruno.

Le retrait de BioBERT et FAISS concerne uniquement la présentation du projet Medical RAG, pas les fonctionnalités indépendantes du MPI.

## Installation locale

### Prérequis

Un serveur HTTP statique suffit. Aucun `npm install`, bundler ou processus de compilation n'est nécessaire.

Exemples d'outils possibles :

- extension Live Server de Visual Studio Code ;
- serveur HTTP intégré à Python ;
- serveur statique Node.js ;
- serveur web local Apache ou Nginx.

### Lancement avec Python

Depuis la racine du projet :

```bash
python3 -m http.server 8000
```

Ouvrir ensuite :

```text
http://localhost:8000
```

Il ne faut pas ouvrir directement `index.html` avec une URL `file://`. Les catalogues de traduction sont chargés avec `fetch()` et nécessitent donc un serveur HTTP.

## Configuration du formulaire

Le formulaire contient actuellement cette URL de démonstration :

```html
action="https://formspree.io/f/VOTRE_ID"
```

Avant la mise en production du formulaire :

1. créer ou utiliser un formulaire Formspree ;
2. remplacer `VOTRE_ID` par l'identifiant réel ;
3. vérifier l'adresse de destination dans Formspree ;
4. tester les états de succès et d'erreur ;
5. vérifier la réception et la protection anti-spam.

Sans cette configuration, l'interface fonctionne mais l'envoi réel ne peut pas aboutir correctement.

## Déploiement

Le site peut être déployé sur toute plateforme d'hébergement statique :

- GitHub Pages ;
- Cloudflare Pages ;
- Netlify ;
- Vercel ;
- hébergement web classique.

Tous les chemins utilisés sont relatifs, à l'exception :

- de l'URL canonique `https://sarahtordeur.dev/` ;
- des images sociales absolues ;
- de l'endpoint Formspree ;
- de Google Fonts.

Après un changement de domaine, mettre à jour :

- la balise canonique ;
- `og:url` ;
- `og:image` ;
- `twitter:image` ;
- les URL présentes dans le JSON-LD ;
- `robots.txt` ;
- `sitemap.xml`.

## Maintenance SEO

Lors d'une modification importante du contenu :

1. mettre à jour la balise `<title>` ;
2. vérifier la longueur et la précision de la meta description ;
3. synchroniser Open Graph et Twitter ;
4. actualiser `dateModified` dans le JSON-LD ;
5. actualiser `<lastmod>` dans `sitemap.xml` ;
6. vérifier que les technologies citées correspondent au projet réel ;
7. retirer les anciennes fonctionnalités et dépendances des catalogues i18n ;
8. contrôler les textes alternatifs des nouvelles images.

## Accessibilité

Les éléments suivants sont intégrés :

- balises sémantiques `nav`, `main`, `section`, `article`, `figure` et `footer` ;
- attributs `aria-label` sur les principaux composants ;
- textes alternatifs sur les captures ;
- navigation de la modale avec `Escape`, flèche gauche et flèche droite ;
- boutons identifiables par les technologies d'assistance ;
- messages de formulaire utilisant `role="alert"` ou `role="status"` ;
- styles `:focus-within` sur le sélecteur de langue ;
- réduction des animations selon la préférence système.

## Vérifications recommandées

### JavaScript

```bash
node --check script.js
```

### JSON et JSON-LD

```bash
ruby -rjson -e '
JSON.parse(File.read("locales/fr.json"))
JSON.parse(File.read("locales/en.json"))
html = File.read("index.html")
json_ld = html[/<script type="application\/ld\+json">\s*(.*?)\s*<\/script>/m, 1]
JSON.parse(json_ld)
puts "JSON valides"
'
```

### Sitemap

```bash
xmllint --noout sitemap.xml
```

### Diff Git

```bash
git diff --check
```

### Contrôles manuels

- tester le sélecteur FR/EN après rechargement de la page ;
- tester le menu mobile ;
- parcourir toutes les galeries ;
- tester la modale à la souris et au clavier ;
- vérifier les liens externes ;
- contrôler les différentes largeurs d'écran ;
- vérifier le formulaire après configuration de Formspree ;
- tester la page sans JavaScript pour confirmer la présence du contenu français ;
- lancer un audit Lighthouse pour les performances, le SEO et l'accessibilité.

## Conventions de contribution

- conserver le français comme langue source dans `index.html` ;
- synchroniser toute modification visible avec `locales/en.json` ;
- ne pas ajouter de framework ou de dépendance sans besoin réel ;
- utiliser des chemins relatifs pour les ressources locales ;
- compresser les nouvelles images avant leur ajout ;
- renseigner des dimensions `width` et `height` lorsque possible ;
- conserver des noms de fichiers descriptifs ;
- mettre à jour ce README lorsque l'architecture ou les projets évoluent.

## Limitations actuelles

- l'identifiant Formspree doit encore être configuré ;
- la traduction repose sur le texte français comme clé, donc toute modification du texte source nécessite une mise à jour du catalogue anglais ;
- les métriques du nouvel index BM25 ne sont pas encore publiées ;
- les images représentent la majorité du poids total du site ;
- le portfolio est une page unique et ne possède pas encore de pages dédiées par projet.

## Licence et contenu

Le code et le contenu de ce portfolio appartiennent à Sarah Tordeur. Les captures de projets, textes, coordonnées et œuvres visuelles ne doivent pas être réutilisés sans autorisation.
