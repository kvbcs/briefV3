# BriefV3

> Projet Angular réalisé dans le cadre de la V3 du Brief de Simplon.  
> Frontend en Angular 18+, en collaboration avec une équipe backend.  
> Le frontend simule l’authentification en attendant l’API réelle.

---

## 🧱 Fonctionnalités implémentées

- ✅ Affichage de la page d’accueil avec formulaire de connexion
- ✅ Connexion simulée à partir d’un fichier JSON (`mock-data.json`)
- ✅ Service `FakeAuthService` pour simuler la logique d’authentification
- ✅ Formulaire de connexion Angular (reactive forms)
- ✅ Gestion des erreurs d'identification
- ✅ Modale d’inscription responsive (standalone)
- ✅ Fermeture de la modale via croix, bouton ou événement `@Output`
- ✅ Validation des champs du formulaire d’inscription avec messages d’erreur
- ✅ Stockage simulé de l'utilisateur connecté dans `localStorage`

---

## 🚀 Lancer le serveur de développement

```bash
ng serve
Puis ouvrez http://localhost:4200 dans le navigateur.
Le rechargement est automatique à chaque sauvegarde.

🧪 Tester la connexion simulée
Fichier : src/assets/mock-data.json

Utilisateurs fictifs disponibles :

json
Copier
Modifier
{
  "users": [
    {
      "email": "alice@example.com",
      "password": "password123"
    },
    {
      "email": "bob@example.com",
      "password": "azerty"
    }
  ]
}
🧑‍🤝‍🧑 Répartition des tâches
✅ Partie frontend – Cécile
Intégration du formulaire de connexion

Création de la modale d’inscription

Mock de l'API de connexion via assets/mock-data.json

Validation des champs du formulaire

🔲 Partie frontend – Membre 2 (à compléter)
<!-- Exemple : - Création de la navbar - Affichage des briefs et détails -->
🔲 Partie frontend – Membre 3 (à compléter)
<!-- Exemple : - Composant d'affichage des promos -->
🔲 Partie frontend – Membre 4 (à compléter)
<!-- Exemple : - Intégration de la page de dashboard -->
📦 Générer un composant Angular
bash
Copier
Modifier
ng generate component component-name --standalone
N’oubliez pas d’ajouter le composant dans les imports si vous utilisez Angular standalone.

🛠️ Compiler le projet
bash
Copier
Modifier
ng build
Les fichiers générés seront dans dist/brief-v3/.

🧪 Tests unitaires
bash
Copier
Modifier
ng test
📚 Ressources utiles
Documentation Angular CLI

Guide Angular standalone

bash
Copier
Modifier

Tu peux créer le fichier comme ça dans ton terminal si besoin :

```bash
touch README.md
