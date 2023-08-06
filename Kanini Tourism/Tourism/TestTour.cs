using Xunit;
using Moq;
using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Kanini_Tourism.Controllers;
using Microsoft.AspNetCore.Hosting;
using System.Reflection;

namespace Kanini_Tourism.Test
{
    public class TourPackageTests
    {

        [Fact]
        public void GetAllImages_ReturnsListOfTours()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            var expectedTours = new List<TourPackage>
    {
        new TourPackage { PackageId = 1, PackageName = "Tour 1", Destination = "Destination 1", PriceForAdult = 100, PriceForChild = 50, Duration = 3, Description = "Description 1", PackImage = "image1.jpg" },
        new TourPackage { PackageId = 2, PackageName = "Tour 2", Destination = "Destination 2", PriceForAdult = 150, PriceForChild = 75, Duration = 5, Description = "Description 2", PackImage = "image2.jpg" }
    };
            // Set up the mock repository to return null for GetAllTours()
            mockRepository.Setup(repo => repo.GetAllTours()).Returns(() => null);
            var controller = new TourController(mockRepository.Object, Mock.Of<IWebHostEnvironment>());

            // Act
            var result = controller.GetAllImages();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, notFoundResult.StatusCode);
        }


        [Fact]
        public void GetTourById_ExistingId_ReturnsTour()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            var expectedTour = new TourPackage
            {
                PackageId = 1,
                PackageName = "Tour 1",
                Destination = "Destination 1",
                PriceForAdult = 100,
                PriceForChild = 50,
                Duration = 3,
                Description = "Description 1",
                PackImage = "falls.jpg" // Make sure this corresponds to the image file in the 'Packages' folder
            };
            mockRepository.Setup(repo => repo.GetTourById(1)).Returns(expectedTour);

            var mockWebHostEnvironment = Mock.Of<IWebHostEnvironment>();
            // Set up the WebRootPath to return a test path for Packages folder
            Mock.Get(mockWebHostEnvironment).Setup(env => env.WebRootPath).Returns("D:\\kanini training\\C#\\Kanini Tourism\\Kanini Tourism\\wwwroot");

            var controller = new TourController(mockRepository.Object, mockWebHostEnvironment);

            // Act
            var result = controller.GetTourById(1);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            var actualTour = Assert.IsType<TourPackage>(actionResult.Value);

            // Add additional assertions to verify the properties of the returned TourPackage object
            Assert.Equal(expectedTour.PackageId, actualTour.PackageId);
            Assert.Equal(expectedTour.PackageName, actualTour.PackageName);
            // Add more assertions for other properties if needed.
        }

        [Fact]
        public void GetTourById_NonExistentId_ReturnsNotFound()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            // Set up the mock repository to return null for GetTourById(2)
            mockRepository.Setup(repo => repo.GetTourById(2)).Returns(() => null);
            var controller = new TourController(mockRepository.Object, Mock.Of<IWebHostEnvironment>());

            // Act
            var result = controller.GetTourById(2);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, notFoundResult.StatusCode);
        }



        [Fact]
        public async Task CreateTour_ValidTour_ReturnsCreatedTour()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            var expectedTour = new TourPackage
            {
                PackageId = 1,
                PackageName = "Sample Package",
                Destination = "Sample Destination",
                PriceForAdult = 100,
                PriceForChild = 50,
                Duration = 5,
                Description = "Sample Description",
                PackImage = "sample-image.jpg",
                UserId = "sample-user-id"
            };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.CreateTour(expectedTour, mockFormFile.Object)).ReturnsAsync(expectedTour);
            var controller = new TourController(mockRepository.Object, Mock.Of<IWebHostEnvironment>());

            // Act
            var result = await controller.Post(expectedTour, mockFormFile.Object);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var actualCreatedTour = Assert.IsType<TourPackage>(createdAtActionResult.Value);
            Assert.Equal(expectedTour.PackageId, actualCreatedTour.PackageId);
            Assert.Equal(expectedTour.PackageName, actualCreatedTour.PackageName);
            // Add more assertions for other properties if needed.
        }


        [Fact]
        public async Task UpdateTour_ValidTour_ReturnsUpdatedTour()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            var existingTour = new TourPackage
            {
                PackageId = 1,
                PackageName = "Existing Package",
                Destination = "Existing Destination",
                PriceForAdult = 100,
                PriceForChild = 50,
                Duration = 5,
                Description = "Existing Description",
                PackImage = "existing-image.jpg",
                UserId = "existing-user-id"
            };
            var updatedTour = new TourPackage
            {
                PackageId = 1,
                PackageName = "Updated Package",
                Destination = "Updated Destination",
                PriceForAdult = 150,
                PriceForChild = 75,
                Duration = 7,
                Description = "Updated Description",
                PackImage = "updated-image.jpg",
                UserId = "updated-user-id"
            };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.UpdateTour(updatedTour, mockFormFile.Object)).ReturnsAsync(updatedTour);
            var controller = new TourController(mockRepository.Object, Mock.Of<IWebHostEnvironment>());

            // Act
            var result = await controller.Put(existingTour.PackageId, updatedTour, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<TourPackage>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualUpdatedTour = Assert.IsType<TourPackage>(okResult.Value);
            Assert.Equal(updatedTour, actualUpdatedTour);
        }

        [Fact]
        public async Task DeleteTour_ExistingId_ReturnsDeletedTour()
        {
            // Arrange
            var mockRepository = new Mock<ITour>();
            var tourToDelete = new TourPackage
            {
                PackageId = 1,
                PackageName = "Existing Package",
                Destination = "Existing Destination",
                PriceForAdult = 100,
                PriceForChild = 50,
                Duration = 5,
                Description = "Existing Description",
                PackImage = "existing-image.jpg",
                UserId = "existing-user-id"
            };
            mockRepository.Setup(repo => repo.DeleteTourById(1)).ReturnsAsync(new List<TourPackage> { tourToDelete });
            var controller = new TourController(mockRepository.Object, Mock.Of<IWebHostEnvironment>());

            // Act
            var result = await controller.DeleteTourById(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<List<TourPackage>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualDeletedTourList = Assert.IsType<List<TourPackage>>(okResult.Value);
            Assert.Single(actualDeletedTourList);
            Assert.Equal(tourToDelete, actualDeletedTourList[0]);
        }



    }
}
