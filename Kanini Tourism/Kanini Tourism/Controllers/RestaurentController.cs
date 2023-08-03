using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurentController : ControllerBase
    {
         private readonly IRestaurent _user;
        public RestaurentController(IRestaurent user)
        {
            _user = user;
        }
        [HttpGet]
        public IEnumerable<Restaurent> Get()
        {
            return _user.GetAllrestaurents();
        }
        [HttpGet("{id}")]
        public Restaurent GetById(int id)
        {
            return _user.GetrestaurentById(id);
        }

        [HttpPost]
        public async Task<ActionResult<Restaurent>> Post([FromForm] Restaurent restaurent, IFormFile imageFile)
        {

            try
            {
                var createdRestaurent = await _user.Createrestaurent(restaurent, imageFile);
                return CreatedAtAction("Get", new { id = createdRestaurent.RestaurentId }, createdRestaurent);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Restaurent>> Put(int id, [FromForm] Restaurent restaurent, IFormFile imageFile)
        {
            try
            {
                restaurent.RestaurentId = id;
                var updatedTour = await _user.Updaterestaurent(restaurent, imageFile);
                return Ok(updatedTour);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Restaurent>>> DeleteRestaurentById(int id)
        {
            var users = await _user.DeleterestaurentById(id);
            if (users is null)
            {
                return NotFound("package not matching");
            }
            return Ok(users);
        }

        // Destination
        [HttpGet("filteringLocation")]

        public IEnumerable<Restaurent> Filterlocation(string Location)
        {
            return _user.FilterLocation(Location);

        }
    }
}
