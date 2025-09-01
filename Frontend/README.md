# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Frontend Documentation

## Overview
This is the frontend for the To-Do List application, built with React, TypeScript, Vite, and Ant Design. It communicates with the backend API to manage to-do items, providing a modern, responsive, and user-friendly interface.

---

## Tech Stack
- React (TypeScript)
- Vite (build tool)
- Ant Design (UI components)
- Axios (API calls)
- Vitest & Testing Library (unit/integration tests)
- Docker (for production builds) ** in testing

---

## Project Structure
- `src/components/` — UI components (lists, modals, error boundary)
- `src/pages/` — Main page (e.g., `todoPage.tsx`)
- `src/services/appCalls.tsx` — API calls (uses `VITE_API_BASE_URL`)
- `src/contexts/` — React context for popup/modal state
- `src/tests/` — Unit/integration tests
- `.env.example` — Example environment variables

---

## Key Features
- View pending and completed to-do lists
- Create, edit, delete, and mark to-do items as complete
- Due date picker restricts to future dates
- Dates displayed as YYYY-MM-DD
- ErrorBoundary for user-friendly error messages
- API base URL is configurable via `.env`
- List auto-refresh after create/update
- Comprehensive unit/integration tests
- Production-ready Dockerfile

---

## Setup & Usage
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run locally:**
   ```sh
   npm run dev
   ```
   - Set `VITE_API_BASE_URL` in `.env` to your backend API URL.
3. **Run tests:**
   ```sh
   npm run test
   ```
4. **Build for production:**
   ```sh
   npm run build
   ```
5. **Docker:**
   - Build: `docker build -t todofrontend .`
   - Run: `docker run -p 3000:80 todofrontend`

---

## Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL (e.g., `http://localhost:5000`)

---

## Testing
- All components and pages are covered by unit/integration tests in `src/tests/`.
- Uses Vitest and Testing Library for React.

---

## Production
- Use the provided Dockerfile for optimized builds.
- All API URLs should be set via environment variables for deployment flexibility.


