using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.Dtos;
using ToDo.Interface;
using ToDo.Models;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase, IToDoController
    {
        private readonly ToDoDbContext _dbContext;
        private readonly ILogger<ToDoController> _logger;

        public ToDoController(ToDoDbContext dbContext, ILogger<ToDoController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpPost]

        public async Task<ToDoDto> CreateAsync(ToDoDto item)
        {
            try
            {
                // Ensure the Id is a new Guid if not provided
                var newId = item.Id = Guid.NewGuid();
                var todoModel = new ToDoItem
                {
                    Id = newId,
                    TaskName = item.TaskName,
                    CreatedOn = DateTime.UtcNow,
                    DueDate = item.DueDate.Kind == DateTimeKind.Utc ? item.DueDate : item.DueDate.ToUniversalTime(),
                    UpdatedOn = DateTime.UtcNow,
                    Description = item.Description,
                    IsOverdue = false,
                    IsComplete = false,
                    IsDeleted = false
                };

                await _dbContext.ToDoItems.AddAsync(todoModel);
                await _dbContext.SaveChangesAsync();

                // Return the DTO with the generated Id
                item.Id = todoModel.Id;
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ToDo item");
                throw new Exception("Error creating ToDo item", ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var todoItem = await _dbContext.ToDoItems.FindAsync(id);
                if (todoItem == null) return false;

                _dbContext.ToDoItems.Remove(todoItem);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ToDo item");
                throw new Exception("Error deleting ToDo item", ex);
            }
        }

        [HttpGet]
        public async Task<IEnumerable<ToDoDto>> GetAllAsync()
        {
            try
            {
                var todoItems = await _dbContext.ToDoItems.ToListAsync();
                return todoItems.Select(item => new ToDoDto
                {
                    Id = item.Id,
                    TaskName = item.TaskName,
                    CreatedOn = item.CreatedOn.Kind == DateTimeKind.Utc ? item.CreatedOn : item.CreatedOn.ToUniversalTime(),
                    DueDate = item.DueDate.Kind == DateTimeKind.Utc ? item.DueDate : item.DueDate.ToUniversalTime(),
                    UpdatedOn = item.UpdatedOn.Kind == DateTimeKind.Utc ? item.UpdatedOn : item.UpdatedOn.ToUniversalTime(),
                    Description = item.Description,
                    IsOverdue = item.IsOverdue,
                    IsComplete = item.IsComplete,
                    IsDeleted = item.IsDeleted
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ToDo items");
                throw new Exception("Error retrieving ToDo items", ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ToDoDto> GetByIdAsync(Guid id)
        {
            try
            {
                var todoItem = await _dbContext.ToDoItems.FindAsync(id);
                if (todoItem == null) throw new Exception("Error retrieving ToDo item");

                return new ToDoDto
                {
                    Id = todoItem.Id,
                    TaskName = todoItem.TaskName,
                    CreatedOn = todoItem.CreatedOn,
                    DueDate = todoItem.DueDate,
                    UpdatedOn = DateTime.UtcNow,
                    Description = todoItem.Description,
                    IsOverdue = todoItem.IsOverdue,
                    IsComplete = todoItem.IsComplete,
                    IsDeleted = todoItem.IsDeleted
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ToDo item");
                throw new Exception("Error retrieving ToDo item", ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<bool> UpdateAsync(Guid id, ToDoDto item)
        {
            try
            {
                var todoItem = await _dbContext.ToDoItems.FindAsync(id);
                if (todoItem == null) return false;

                todoItem.TaskName = item.TaskName;
                todoItem.CreatedOn = item.CreatedOn.Kind == DateTimeKind.Utc ? item.CreatedOn : item.CreatedOn.ToUniversalTime();
                todoItem.DueDate = item.DueDate.Kind == DateTimeKind.Utc ? item.DueDate : item.DueDate.ToUniversalTime();
                todoItem.UpdatedOn = DateTime.UtcNow;
                todoItem.Description = item.Description;
                todoItem.IsOverdue = item.IsOverdue;
                todoItem.IsComplete = item.IsComplete;
                todoItem.IsDeleted = item.IsDeleted;

                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating ToDo item");
                throw new Exception("Error updating ToDo item", ex);
            }
        }
    }
}