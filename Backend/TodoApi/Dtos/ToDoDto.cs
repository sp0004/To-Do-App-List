using System;

namespace ToDo.Dtos
{
    public class ToDoDto
    {
        public Guid Id { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsOverdue { get; set; }
        public bool IsComplete { get; set; }
        public bool IsDeleted { get; set; }
    }
}
