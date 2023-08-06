using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanini_Tourism.Controllers;
using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Kanini_Tourism.Tests.ServiceTests
{
    public class BookingServiceTests
    {
        private Mock<IBook> _mockBookingService;
        private BookController _controller;

        public BookingServiceTests()
        {
            _mockBookingService = new Mock<IBook>();
            _controller = new BookController(_mockBookingService.Object);
        }

        // Get_ReturnsListOfBooking Test
        [Fact]
        public void Get_ReturnsListOfBooking()
        {
            // Arrange
            var expectedBookings = new List<Booking>
    {
        new Booking { BookingId = 1, Name = "John Doe", Email = "john@example.com", StartDate = DateTime.Now.AddDays(1), Adult = 2, Child = 1, TotalPrice = 300 },
        new Booking { BookingId = 2, Name = "Jane Smith", Email = "jane@example.com", StartDate = DateTime.Now.AddDays(2), Adult = 1, Child = 0, TotalPrice = 150 },
    };
            _mockBookingService.Setup(repo => repo.GetAllBooking()).Returns(expectedBookings);

            // Act
            var result = _controller.Get();

            // Assert
            var actualBookings = Assert.IsAssignableFrom<IEnumerable<Booking>>(result); // Use IsAssignableFrom
            Assert.Equal(expectedBookings, actualBookings);
        }


        [Fact]
        public async Task Add_ReturnsListOfBookingAfterAdd()
        {
            // Arrange
            var newBooking = new Booking
            {
                BookingId = 3,
                Name = "Alice Johnson",
                Email = "alice@example.com",
                StartDate = DateTime.Now.AddDays(3),
                Adult = 2,
                Child = 2,
                TotalPrice = 500
            };
            var expectedBookings = new List<Booking>
            {
                new Booking { BookingId = 1, Name = "John Doe", Email = "john@example.com", StartDate = DateTime.Now.AddDays(1), Adult = 2, Child = 1, TotalPrice = 300 },
                new Booking { BookingId = 2, Name = "Jane Smith", Email = "jane@example.com", StartDate = DateTime.Now.AddDays(2), Adult = 1, Child = 0, TotalPrice = 150 },
                newBooking, // Newly added booking
            };
            _mockBookingService.Setup(repo => repo.AddBooking(newBooking)).ReturnsAsync(expectedBookings);

            // Act
            var result = await _controller.Add(newBooking);

            // Assert
            var bookingsResult = Assert.IsType<ActionResult<List<Booking>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(bookingsResult.Result);
            var actualBookings = Assert.IsAssignableFrom<List<Booking>>(okResult.Value);
            Assert.Equal(expectedBookings, actualBookings);
        }

        // Update_ExistingBooking_ReturnsOkObjectResultWithUpdatedBooking Test
        [Fact]
        public async Task Update_ExistingBooking_ReturnsOkObjectResultWithUpdatedBooking()
        {
            // Arrange
            var bookingIdToUpdate = 2;
            var updatedBooking = new Booking
            {
                BookingId = 2,
                Name = "Jane Smith",
                Email = "jane@example.com",
                StartDate = new DateTime(2023, 8, 11), // Set the expected date here
                Adult = 2,
                Child = 0,
                TotalPrice = 200,
            };

            // Simulate updating the booking by returning the updated booking
            _mockBookingService.Setup(repo => repo.UpdateBooking(bookingIdToUpdate, It.IsAny<Booking>())).ReturnsAsync(updatedBooking);

            // Act
            var result = await _controller.Update(bookingIdToUpdate, updatedBooking);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            var actualBooking = Assert.IsType<Booking>(actionResult.Value);

            // Check individual properties to ensure the booking is updated correctly
            Assert.Equal(updatedBooking.Name, actualBooking.Name);
            Assert.Equal(updatedBooking.Email, actualBooking.Email);
            Assert.Equal(updatedBooking.StartDate, actualBooking.StartDate); // Check the StartDate property
            Assert.Equal(updatedBooking.Adult, actualBooking.Adult);
            Assert.Equal(updatedBooking.Child, actualBooking.Child);
            Assert.Equal(updatedBooking.TotalPrice, actualBooking.TotalPrice);
        }

        [Fact]
        public async Task DeleteById_ReturnsListOfBookingAfterDelete()
        {
            // Arrange
            var bookingIdToDelete = 1;
            var expectedBookings = new List<Booking>
            {
                new Booking { BookingId = 2, Name = "Jane Smith", Email = "jane@example.com", StartDate = DateTime.Now.AddDays(2), Adult = 1, Child = 0, TotalPrice = 150 },
            };
            _mockBookingService.Setup(repo => repo.DeleteBookingById(bookingIdToDelete)).ReturnsAsync(expectedBookings);

            // Act
            var result = await _controller.DeleteById(bookingIdToDelete);

            // Assert
            var bookingsResult = Assert.IsType<ActionResult<List<Booking>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(bookingsResult.Result);
            var actualBookings = Assert.IsAssignableFrom<List<Booking>>(okResult.Value);
            Assert.Equal(expectedBookings, actualBookings);
        }
    }
}
