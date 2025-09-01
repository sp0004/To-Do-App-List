using Microsoft.EntityFrameworkCore;
using ToDo.Models;

namespace TodoApi.Models
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public ToDoDbContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Fallback connection string for design-time tools
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=todo;Username=postgres;Password=postgres");
            }
        }

        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}