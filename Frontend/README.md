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
- Docker (for production builds) **( Please note this is in testing , not fully functional yet) 

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
5. **Docker:** **( Please note this is in testing , not fully functional yet)
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


