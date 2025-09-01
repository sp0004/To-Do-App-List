# Backend Documentation

## Overview
This is the backend for the To-Do List application, built with ASP.NET Core Web API and Entity Framework Core. It provides a RESTful API for managing to-do items, with robust validation, error handling, and test coverage.

---

## Tech Stack
- ASP.NET Core Web API (C#)
- Entity Framework Core (EF Core)
- PostgreSQL (default, can use InMemory for tests)
- NUnit & Moq for testing
- Docker support

---

## Project Structure
- `Controllers/ToDoController.cs`: Main API controller for To-Do CRUD operations.
- `Models/ToDo.cs`, `Models/ToDoDbContext.cs`: Entity and DB context.
- `Dtos/ToDoDto.cs`: Data transfer object for API.
- `Repositories/`: Repository pattern for testability.
- `Tests/TodoApi.Tests/`: Unit and integration tests.
- `appsettings.json`: Configuration (connection strings, etc).

---

## Key Features
- CRUD endpoints: Create, Read (all/by id), Update, Delete.
- DateTime is always stored and returned in UTC.
- Validation: Due date must be in the future.
- Error handling: All exceptions are logged and return meaningful errors.
- Repository pattern for easy mocking/testing.
- Unit tests for all major scenarios.


---

## Setup & Usage
1. **Run locally:**
   ```sh
   dotnet build
   dotnet run
   ```
   - Configure DB in `appsettings.json`.
2. **Run tests:**
   ```sh
   dotnet test
   ```
3. **Migrations:**
   ```sh
   dotnet ef migrations add <Name>
   dotnet ef database update
   ```
4. **Docker:**
   - Build: `docker build -t todoapi .`
   - Run: `docker run -p 5000:80 todoapi`

---

## API Endpoints
- `POST /ToDo`: Create a new to-do item
- `GET /ToDo`: Get all to-do items
- `GET /ToDo/{id}`: Get a to-do item by id
- `PUT /ToDo/{id}`: Update a to-do item
- `DELETE /ToDo/{id}`: Delete a to-do item

---

## Testing
- **Unit tests** are in `Tests/TodoApi.Tests/`.
- Use `dotnet test` to run all tests.
- Uses NUnit and Moq for mocking and assertions.

---

## Production
- All configuration (connection strings, etc.) should be set via environment variables or `appsettings.json` for deployment flexibility.


