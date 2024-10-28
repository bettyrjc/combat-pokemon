# Choose yours pokemon to combat 🤺

# Stack
- React
- Vite
- Redux
- TypeScrip
- Cypress

# Run test

`npm run cypress:run`

## Watch tests

`npm run cypress:open`

# setup project

`git clone https://github.com/bettyrjc/combat-pokemon.git`
`npm install`
`npm run dev`

# URL Vercel

[Link to vercel](https://combat-pokemon-five.vercel.app/)

# how to deploy to production

Just push main branch
`git push main`

# File Structure

```.
├── README.md
├── cypress
│   ├── e2e
│   │   └── src
│   ├── fixtures
│   ├── support
│   │   ├── commands.ts
│   │   └── e2e.ts
│   └── tsconfig.json
├── cypress.config.d.ts
├── cypress.config.ts
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── api.ts
│   │   └── index.css
│   ├── main.tsx
│   ├── modules
│   │   ├── pokemons
│   │   └── shared
│   ├── store.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.app.tsbuildinfo
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.node.tsbuildinfo
├── tsconfig.tsbuildinfo
├── vite.config.d.ts
├── vite.config.js
└── vite.config.ts
```

# Improvements
 - [ ] add clear input button
 - [ ] confirmation for delete combat list
 - [ ] unit test for api
