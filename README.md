# Démineur React

Une implémentation du jeu classique Démineur, développée avec React, TypeScript et Vite.

![Démineur](public/images/flag.gif) ![Mine](public/images/mine.gif) ![Explosion](public/images/exploded.gif)

## 🚀 Technologies utilisées

- **React 19** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript 5.8** - Superset typé de JavaScript pour un développement plus robuste
- **Vite 6** - Outil de build ultra-rapide pour le développement moderne
- **TailwindCSS 4** - Framework CSS utilitaire pour un design responsive
- **ESLint 9** - Linter pour maintenir la qualité du code

## 🎮 Fonctionnalités

- Interface utilisateur intuitive et réactive
- Plusieurs niveaux de difficulté (facile, normal, avancé, impossible)
- Design inspiré du démineur classique de Windows

## 📋 Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

## 🔧 Installation et Lancement

1.  Clonez ce dépôt sur votre machine locale :
    ```bash
    git clone https://github.com/creasitenet/demineur_react.git
    cd demineur_react
    ```

2.  Installez les dépendances du projet. Choisissez l'une des commandes suivantes en fonction de votre gestionnaire de paquets préféré :
    ```bash
    # Avec npm
    npm install

    # Ou avec yarn
    yarn install
    ```

3.  Lancez l'application en mode développement :
    ```bash
    # Avec npm
    npm run dev

    # Ou avec yarn
    yarn dev
    ```
    Ouvrez votre navigateur et allez sur `http://localhost:5173` (ou le port indiqué dans la console Vite, généralement 5173 par défaut).

## 🛠️ Scripts disponibles

-   `npm run dev` ou `yarn dev`: Lance le serveur de développement.
-   `npm run build` ou `yarn build`: Compile l'application pour la production dans le dossier `dist/`.
-   `npm run lint` ou `yarn lint`: Exécute ESLint pour analyser le code.
-   `npm run preview` ou `yarn preview`: Lance un serveur local pour prévisualiser le build de production.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
