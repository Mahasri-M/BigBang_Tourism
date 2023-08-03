using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotel _user;
        public HotelController(IHotel user)
        {
            _user = user;
        }
        [HttpGet]
        public IEnumerable<Hotels> Get()
        {
            return _user.GetAllHotels();
        }
        [HttpGet("{id}")]
        public Hotels GetById(int id)
        {
            return _user.GetHotelById(id);
        }
        [HttpPost]
        public async Task<ActionResult<Hotels>> Post([FromForm] Hotels hotel, IFormFile imageFile)
        {

            try
            {
                var createdHotel = await _user.CreateHotel(hotel, imageFile);
                return CreatedAtAction("Get", new { id = createdHotel.HotelId }, createdHotel);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Hotels>> Put(int id, [FromForm] Hotels hotel, IFormFile imageFile)
        {
            try
            {
                hotel.HotelId = id;
                var updatedTour = await _user.UpdateHotel(hotel, imageFile);
                return Ok(updatedTour);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Hotels>>> DeleteHotelById(int id)
        {
            var users = await _user.DeleteHotelById(id);
            if (users is null)
            {
                return NotFound("package not matching");
            }
            return Ok(users);
        }

        // Destination
        [HttpGet("filteringLocation")]

        public IEnumerable<Hotels> Filterlocation(string Location)
        {
            return _user.FilterLocation(Location);

        }
    }
}
