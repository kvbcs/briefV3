# ShuffleMyTeam

## Présentation

ShuffleMyTeam est une application Angular permettant la gestion de groupes, d'utilisateurs et l'organisation de tirages au sort pour répartir des personnes dans des groupes. Elle propose des fonctionnalités d'inscription, de connexion, de création et d'affichage de groupes, ainsi que la consultation de l'historique des tirages.

## Fonctionnalités principales

- **Inscription** : Les nouveaux utilisateurs peuvent s'inscrire via un formulaire dédié.
- **Connexion** : Authentification sécurisée pour accéder à l'application.
- **Création de liste** : Ajout et nommage de liste par l'utilisateur.
- **Création des profils** : Ajout et paramétrage des propriétés des personnes par l'utilisateur.
- **Création de groupes** : Génération automatique de groupes à partir d'une configuration personnalisée.
- **Affichage des groupes** : Visualisation des groupes générés ou existants.
- **Validation des groupes** : Possibilité de valider la composition des groupes.
- **Historique des tirages** : Consultation de l'historique des tirages précédents.

## Structure du projet

- `src/app/auth/` : Gestion de l'authentification (connexion, inscription).
- `src/app/adminpage/` : Administration, gestion des utilisateurs et statistiques.
- `src/app/core/services/` : Services pour la gestion des groupes, listes, profils, etc.
- `src/app/Groups/` : Composants liés à la gestion et à l'affichage des groupes.
- `src/app/DrawHistory/` : Affichage de l'historique des tirages.
- `src/app/models/` : Modèles de données (utilisateur, groupe, historique, etc.).

## Installation et lancement

1. **Cloner le dépôt**
2. Installer les dépendances :
   ```powershell
   npm install
   ```
3. Lancer l'application :
   ```powershell
   npm start
   ```
4. Accéder à l'application sur [http://localhost:4200](http://localhost:4200)

## Fonctionnement détaillé

### Authentification

- **Inscription** :
  - Accéder à la page d'inscription via le bouton "S'inscrire".
  - Remplir le formulaire et valider pour créer un compte.
- **Connexion** :
  - Accéder à la page de connexion.
  - Saisir ses identifiants (email + mot de passe) pour accéder à l'application.

### Gestion des listes

- **Création de liste** :
- Accéder à la page de création de listes.
- Afficher l'historique des listes créées par l'utilisateur connecté, réparti dans un ordre chronologique inversé (la liste la plus récente en haut).
- Créer et nommer une nouvelle liste. Renvoie à la page d'historique, avec la liste qui vient d'être créée en premier choix.

- **Création des personnes** :
- Afficher les personnes d'une liste et leurs caractéristiques.
- Accéder à la page de création d'une personne et aux modifications de ses caractéristiques.

### Gestion des groupes

- **Création de groupes** :
  - Accéder à la page de création de groupes.
  - Définir les paramètres (nombre de groupes, personnes, etc.).
  - Lancer la génération automatique.
- **Affichage et validation** :
  - Visualiser les groupes générés.
  - Valider la composition si elle convient.

### Gestion des tirages

- Accéder à la page d'historique pour consulter les anciens tirages et leurs résultats.
- Générer des tirages en fonction des listes choisies

## Configuration du backend

- Un backend est généré sur un serveur API auquel sont liés les différentes fonctionnalités du frontend.

## Technologies utilisées

- Angular
- TypeScript
- RxJS
- HTML/CSS

## Auteurs


- Projet réalisé dans le cadre de la formation Simplon.
  Une équipe répartie en deux groupes :
  
  - **Groupe 1** : Développement du Frontend, de l'interface utilisateur et de ses fonctionnalités principales:
    - BARBECHE Imane
    - MOREL Cécile
    - VIBANCOS Kyllian
    - KUISSI Guy
    - 
  - **Groupe 2** : Mise en place du backend et de ses services.
    - EPIARD Antoine
    - ZULPUKHAROV Arthur
    - ALTALEB Feras

---

N'hésitez pas à consulter le code source pour plus de détails sur chaque fonctionnalité.


Tu peux créer le fichier comme ça dans ton terminal si besoin :

```bash
touch README.md
