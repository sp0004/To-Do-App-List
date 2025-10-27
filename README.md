# To-Do List Application

## Overview
A full-stack To-Do List application built with React (TypeScript, Vite, Ant Design) for the frontend and ASP.NET Core (C#) with Entity Framework Core and PostgreSQL for the backend. The app supports CRUD operations, due date validation, error boundaries, and is production-ready with Docker support.

---

## Backend

### Tech Stack
- ASP.NET Core Web API (C#)
- Entity Framework Core (EF Core)
- PostgreSQL (default, can use InMemory for tests)
- NUnit & Moq for testing
- Docker support

### Structure
- `Controllers/ToDoController.cs`: Main API controller for To-Do CRUD operations.
- `Models/ToDo.cs`, `Models/ToDoDbContext.cs`: Entity and DB context.
- `Dtos/ToDoDto.cs`: Data transfer object for API.
- `Repositories/`: Repository pattern for testability.
- `Tests/TodoApi.Tests/`: Unit and integration tests.
- `appsettings.json`: Configuration (connection strings, etc).

### Key Features
- CRUD endpoints: Create, Read (all/by id), Update, Delete.
- DateTime is always stored and returned in UTC.
- Validation: Due date must be in the future.
- Error handling: All exceptions are logged and return meaningful errors.
- Repository pattern for easy mocking/testing.
- Integration and unit tests for all major scenarios.
- Dockerfile for containerized deployment.

### Running & Testing
1. **Run locally:**
   - `dotnet build` then `dotnet run` in `Backend/TodoApi`.
   - Configure DB in `appsettings.json`.
2. **Run tests:**
   - `dotnet test` in `Backend/TodoApi/Tests/TodoApi.Tests`.
3. **Migrations:**
   - `dotnet ef migrations add <Name>`
   - `dotnet ef database update`
4. **Docker:**
   - Build: `docker build -t todoapi .`
   - Run: `docker run -p 5000:80 todoapi`

### API Endpoints
- `POST /ToDo`: Create a new to-do item
- `GET /ToDo`: Get all to-do items
- `GET /ToDo/{id}`: Get a to-do item by id
- `PUT /ToDo/{id}`: Update a to-do item
- `DELETE /ToDo/{id}`: Delete a to-do item

---

## Frontend

### Tech Stack
- React (TypeScript)
- Vite
- Ant Design (UI)
- Axios (API calls)
- Vitest & Testing Library (unit/integration tests)
- Docker support

### Structure
- `src/components/`: UI components (lists, modals, error boundary)
- `src/pages/`: Main page
- `src/services/appCalls.tsx`: API calls (uses `VITE_API_BASE_URL` env var)
- `src/contexts/`: React context for popup/modal state
- `src/tests/`: Unit/integration tests
- `.env.example`: Shows required environment variables

### Key Features
- Pending and completed to-do lists
- Create, edit, delete, and mark complete
- Due date picker restricts to future dates
- Dates shown as YYYY-MM-DD
- ErrorBoundary for user-friendly error messages
- API base URL is configurable via `.env`
- List auto-refresh after create/update
- Comprehensive unit/integration tests
- Production-ready Dockerfile

### Running & Testing
1. **Install dependencies:**
   - `npm install` in `Frontend`
2. **Run locally:**
   - `npm run dev`
   - Set `VITE_API_BASE_URL` in `.env`
3. **Run tests:**
   - `npm run test`
4. **Build for production:**
   - `npm run build`
5. **Docker:**
   - Build: `docker build -t todofrontend .`
   - Run: `docker run -p 3000:80 todofrontend`

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL (e.g., `http://localhost:5000`)

---

## Testing
- **Backend:** NUnit/Moq for unit/integration tests. See `Backend/TodoApi/Tests/TodoApi.Tests`.
- **Frontend:** Vitest/Testing Library for React components. See `Frontend/src/tests`.


# Stop all services
docker compose down

# Start services
docker compose up -d

# View logs
docker compose logs

# Rebuild and restart
docker compose up --build -d
---


