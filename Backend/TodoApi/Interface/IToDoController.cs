using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Dtos;
using ToDo.Models;

namespace ToDo.Interface
{
    public interface IToDoController
    {
        Task<IEnumerable<ToDoDto>> GetAllAsync();
        Task<ToDoDto> GetByIdAsync(Guid id);
        Task<ToDoDto> CreateAsync(ToDoDto item);
        Task<bool> UpdateAsync(Guid id, ToDoDto item);
        Task<bool> DeleteAsync(Guid id);
    }
}