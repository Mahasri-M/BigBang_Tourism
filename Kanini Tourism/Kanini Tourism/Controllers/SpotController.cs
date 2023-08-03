using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotController : ControllerBase
    {
        private readonly ISpot _user;
        public SpotController(ISpot user)
        {
            _user = user;
        }
        [HttpGet]
        public IEnumerable<Spots> Get()
        {
            return _user.GetAllSpots();
        }
        [HttpGet("{id}")]
        public Spots GetById(int id)
        {
            return _user.GetSpotsById(id);
        }
        [HttpPost]
        public async Task<ActionResult<Spots>> Post([FromForm] Spots Spots, IFormFile imageFile)
        {

            try
            {
                var createdSpots = await _user.CreateSpots(Spots, imageFile);
                return CreatedAtAction("Get", new { id = createdSpots.SpotId }, createdSpots);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Spots>> Put(int id, [FromForm] Spots Spots, IFormFile imageFile)
        {
            try
            {
                Spots.SpotId = id;
                var updatedTour = await _user.UpdateSpots(Spots, imageFile);
                return Ok(updatedTour);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Spots>>> DeleteSpotsById(int id)
        {
            var users = await _user.DeleteSpotsById(id);
            if (users is null)
            {
                return NotFound("package not matching");
            }
            return Ok(users);
        }

        // Destination
        [HttpGet("filteringLocation")]

        public IEnumerable<Spots> Filterlocation(string Location)
        {
            return _user.FilterLocation(Location);

        }
    }
}
