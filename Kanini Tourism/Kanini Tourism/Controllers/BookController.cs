using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBook _user;
        public BookController(IBook user)
        {
            _user = user;
        }
        //[HttpGet]
        //public IEnumerable<Booking> Get()
        //{
        //    return _user.GetAllBooking();
        //}
        [HttpGet]
        public ActionResult<IEnumerable<Booking>> Get()
        {
            try
            {
                var bookings = _user.GetAllBooking();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

        //[HttpGet("{id}")]
        //public Booking GetById(int id)
        //{
        //    return _user.GetBookingById(id);
        //}
        [HttpGet("{id}")]
        public ActionResult<Booking> GetById(int id)
        {
            try
            {
                var booking = _user.GetBookingById(id);
                if (booking == null)
                {
                    return NotFound();
                }
                return booking;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }



        //[HttpPost]
        //public async Task<ActionResult<List<Booking>>> Add(Booking user)
        //{
        //    var users = await _user.AddBooking(user);
        //    return Ok(users);
        //}
        [HttpPost]
        public async Task<ActionResult<List<Booking>>> Add(Booking user)
        {
            try
            {
                var bookings = await _user.AddBooking(user);
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update(int id, Booking updatedBooking)
        //{
        //    var existingBooking = await _user.UpdateBooking(id, updatedBooking);
        //    if (existingBooking == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(existingBooking);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Booking updatedBooking)
        {
            try
            {
                var existingBooking = await _user.UpdateBooking(id, updatedBooking);
                if (existingBooking == null)
                {
                    return NotFound();
                }
                return Ok(existingBooking);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }


        //[HttpDelete("{id}")]
        //public async Task<ActionResult<List<Booking>>> DeleteById(int id)
        //{
        //    var users = await _user.DeleteBookingById(id);
        //    if (users is null)
        //    {
        //        return NotFound("userid not matching");
        //    }
        //    return Ok(users);
        //}

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Booking>>> DeleteById(int id)
        {
            try
            {
                var booking = await _user.DeleteBookingById(id);
                if (booking == null)
                {
                    return NotFound("Booking not found.");
                }
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

    }
}
