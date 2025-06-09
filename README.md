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
- Effets sonores
- Design inspiré du démineur classique de Windows

## 📋 Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

## 🔧 Installation

1. Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/votre-nom/demineur_react.git
cd demineur_react
```

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
