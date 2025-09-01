using NUnit.Framework;
using Moq;
using Microsoft.Extensions.Logging;
using TodoApi.Controllers;
using ToDo.Models;
using ToDo.Dtos;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Tests
{
    public class ToDoControllerTests
    {
        private ToDoController _controller = null!;
        private ToDoDbContext _dbContext = null!;
        private ILogger<ToDoController> _logger = null!;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            _dbContext = new ToDoDbContext(options);
            _logger = new Mock<ILogger<ToDoController>>().Object;
            _controller = new ToDoController(_dbContext, _logger);
        }


        [Test]
        public async Task GetByIdAsync_ShouldReturnItem_WhenFound()
        {
            var dto = new ToDoDto { TaskName = "FindMe", DueDate = System.DateTime.UtcNow.AddDays(1) };
            var created = await _controller.CreateAsync(dto);
            var result = await _controller.GetByIdAsync(created.Id);
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(created.Id));
        }

        [Test]
        public void GetByIdAsync_ShouldThrow_WhenNotFound()
        {
            Assert.ThrowsAsync<Exception>(async () => await _controller.GetByIdAsync(Guid.NewGuid()));
        }

       
        [Test]
        public async Task UpdateAsync_ShouldUpdateSuccessfully()
        {
            var dto = new ToDoDto { TaskName = "ToUpdate", DueDate = System.DateTime.UtcNow.AddDays(1) };
            var created = await _controller.CreateAsync(dto);
            created.TaskName = "UpdatedName";
            var result = await _controller.UpdateAsync(created.Id, created);
            Assert.That(result, Is.True);
            var updated = await _controller.GetByIdAsync(created.Id);
            Assert.That(updated.TaskName, Is.EqualTo("UpdatedName"));
        }

        [Test]
        public async Task UpdateAsync_ShouldReturnFalse_WhenNotFound()
        {
            var dto = new ToDoDto { TaskName = "NotFound", DueDate = System.DateTime.UtcNow.AddDays(1) };
            var result = await _controller.UpdateAsync(Guid.NewGuid(), dto);
            Assert.That(result, Is.False);
        }

        [Test]
        public async Task CreateAsync_ShouldAddToDatabase()
        {
            var dto = new ToDoDto
            {
                TaskName = "Test Task",
                DueDate = System.DateTime.UtcNow.AddDays(1)
            };

            var result = await _controller.CreateAsync(dto);

            Assert.That(result.Id, Is.Not.EqualTo(Guid.Empty));
            Assert.That(result.TaskName, Is.EqualTo("Test Task"));
        }

        

        [Test]
        public async Task DeleteAsync_ShouldDeleteSuccessfully()
        {
            // Arrange: Add a todo
            var dto = new ToDoDto { TaskName = "ToDelete", DueDate = System.DateTime.UtcNow.AddDays(1) };
            var created = await _controller.CreateAsync(dto);

            // Act
            var result = await _controller.DeleteAsync(created.Id);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task DeleteAsync_ShouldReturnFalse_WhenNotFound()
        {
            var result = await _controller.DeleteAsync(Guid.NewGuid());
            Assert.That(result, Is.False);
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnAllValues()
        {
            // Arrange: Add two todos
            await _controller.CreateAsync(new ToDoDto { TaskName = "A", DueDate = System.DateTime.UtcNow.AddDays(1) });
            await _controller.CreateAsync(new ToDoDto { TaskName = "B", DueDate = System.DateTime.UtcNow.AddDays(2) });

            // Act
            var result = await _controller.GetAllAsync();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count(), Is.GreaterThanOrEqualTo(2));
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnEmpty_WhenNoneFound()
        {
            // Use a new context to ensure empty DB
            var options = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase(databaseName: "EmptyDb")
                .Options;
            var dbContext = new ToDoDbContext(options);
            var controller = new ToDoController(dbContext, _logger);

            var result = await controller.GetAllAsync();
            Assert.That(result, Is.Empty);
        }

       
    }
}