# DevScope# DevScope

Application web de recrutement tech. Elle récupère les profils et les dépôts publics depuis l'**API GitHub**, puis permet de gérer une **shortlist de candidats** enregistrée sur une API REST (**MockAPI**).

Projet réalisé en travail individuel, en 5 jours, pour la startup fictive « DevScope ».

## Liens

| Livrable | Lien |
|---|---|
| Application déployée (Vercel) | https://devscope-git-master-whoknows-projects-0c0c42b0.vercel.app/ |
| Tableau Jira | https://youssefodada11.atlassian.net/jira/software/projects/DEV/boards/36 |
| Présentation (Canva) | https://canva.link/k82rs2vwbaz3yqk |
| Dépôt GitHub | _à compléter : lien du dépôt_ |

## Fonctionnalités

### Page Recherche
- Champ « Nom d'utilisateur » et bouton « Analyser ».
- Validation avant l'envoi de la requête : lettres, chiffres et tirets, 1 à 39 caractères, sans tiret au début ni à la fin.
- Message d'erreur sous le champ.

### Page Profil
- Carte du profil : photo, nom, login, bio, ville, date d'inscription, dépôts, abonnés, abonnements.
- Texte par défaut quand une information est `null`.
- Lien vers le profil GitHub original.
- Dépôts affichés en cartes : nom, description, langage (avec sa couleur), étoiles, forks, date de mise à jour.
- Bouton « Ajouter à la shortlist » en un clic, sans doublon.
- Pagination des dépôts par pages de 6.

### Page Shortlist
- Liste des candidats chargée depuis MockAPI (GET) et nombre total.
- Recherche par nom ou login.
- Tri par nom ou par date d'ajout.
- Message quand la shortlist est vide.

### États de l'interface
- Indicateur de chargement pendant chaque requête.
- Messages clairs : développeur introuvable (404), limite de requêtes atteinte (403 / 429), erreur réseau avec bouton « Réessayer ».

## Technologies

- HTML5 sémantique
- Tailwind CSS (mobile-first)
- JavaScript ES6+ en modules (`import` / `export`)
- `fetch` avec `async` / `await`, `try` / `catch` et vérification de `response.ok`
- API GitHub : `https://api.github.com/users/{login}` et `/repos`
- MockAPI pour la shortlist (GET, POST)
- Jira pour la planification, Git / GitHub pour le versionnage, Vercel pour le déploiement

## Architecture

```
/
├── index.html              Page Recherche
├── pages/
│   ├── recherche.html      Page Profil
│   └── shortlist.html      Page Shortlist
├── js/
│   ├── api.js              Appels API (GitHub et MockAPI)
│   ├── recherche.js        Logique de la page Profil
│   ├── shortlist.js        Logique de la page Shortlist
│   └── pagination.js       Pagination des dépôts
└── imges/                  Images et logo
```

Principes :
- Un fichier pour les appels API, un fichier par page.
- Les données de l'API sont affichées avec `createElement` et `textContent`, pour éviter l'injection de HTML.
- Les valeurs `null` de l'API GitHub sont remplacées par un texte par défaut.
- L'interface est générée dynamiquement à partir des données.

## Lancer le projet en local

```bash
git clone <url-du-depot>
cd devscope
```

Ouvrir `index.html` avec l'extension **Live Server** de VS Code. Aucune installation n'est nécessaire : Tailwind et Font Awesome sont chargés depuis un CDN.

## API utilisées

| Service | Méthode | Usage |
|---|---|---|
| GitHub | GET `/users/{login}` | Profil du développeur |
| GitHub | GET `/users/{login}/repos` | Dépôts publics |
| MockAPI | GET | Charger la shortlist |
| MockAPI | POST | Ajouter un candidat (`Content-Type: application/json`, `JSON.stringify`) |

Remarque : l'API GitHub non authentifiée est limitée à 60 requêtes par heure et par adresse IP. Aucun jeton n'est utilisé dans le code.

## Gestion des erreurs

| Cas | Comportement |
|---|---|
| Nom d'utilisateur invalide | Message sous le champ, aucune requête envoyée |
| Développeur introuvable (404) | Message clair |
| Limite de requêtes (403 / 429) | Message clair |
| Hors ligne ou erreur réseau | Message avec bouton « Réessayer » |
| Candidat déjà dans la shortlist | Ajout refusé |
| Shortlist vide | Message avec lien vers la recherche |

## Organisation du travail

- Planification sur Jira, organisée en epics et tickets : voir le lien du tableau ci-dessus.
- Commits réguliers avec des messages clairs, liés aux tickets Jira.

| Jour | Contenu |
|---|---|
| 1 | Tableau Jira, dépôt GitHub, architecture, 3 pages en Tailwind, recherche et validation |
| 2 | `api.js`, affichage du profil, du chargement et des erreurs |
| 3 | Affichage des dépôts, MockAPI et ajout sans doublon |
| 4 | Shortlist : affichage, recherche, tri, tests des erreurs |
| 5 | Responsive, README, déploiement, Jira à jour |

## Accessibilité

- Attribut `alt` sur les images.
- `label` sur les champs (masqués visuellement avec `sr-only` quand nécessaire).
- Navigation au clavier et page active indiquée avec `aria-current`.
- Pages vérifiées avec le validateur W3C : https://validator.w3.org/

## Auteur

_à compléter : ton nom_ , projet pédagogique.