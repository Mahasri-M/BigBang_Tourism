using Kanini_Tourism.Models;
using Kanini_Tourism.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedback _user;
        public FeedbackController(IFeedback user)
        {
            _user = user;
        }
        //[HttpGet]
        //public ActionResult<IEnumerable<Feedback>> Get()
        //{
        //    var feedbacks = _user.GetAllFeedback();
        //    return Ok(feedbacks);
        //}

        [HttpGet]
        public ActionResult<IEnumerable<Feedback>> Get()
        {
            try
            {
                var feedbacks = _user.GetAllFeedback();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }


        //[HttpGet("{id}")]
        //public Feedback GetById(int id)
        //{
        //    return _user.GetFeedbackById(id);
        //}
        [HttpGet("{id}")]
        public ActionResult<Feedback> GetById(int id)
        {
            try
            {
                var feedback = _user.GetFeedbackById(id);
                if (feedback == null)
                {
                    return NotFound();
                }
                return feedback;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

        //[HttpPost]
        //public async Task<ActionResult<List<Feedback>>> Add(Feedback user)
        //{
        //    var users = await _user.AddFeedback(user);
        //    return Ok(users);
        //}

        [HttpPost]
        public async Task<ActionResult<List<Feedback>>> Add(Feedback user)
        {
            try
            {
                var users = await _user.AddFeedback(user);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }


        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update(int id, Feedback updatedFeedback)
        //{
        //    var existingFeedback = await _user.UpdateFeedback(id, updatedFeedback);
        //    if (existingFeedback == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(existingFeedback);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Feedback updatedFeedback)
        {
            try
            {
                var existingFeedback = await _user.UpdateFeedback(id, updatedFeedback);
                if (existingFeedback == null)
                {
                    return NotFound();
                }
                return Ok(existingFeedback);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Feedback>>> DeleteById(int id)
        {
            try
            {
                var customer = await _user.DeleteFeedbackById(id);
                return Ok(customer);
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
            //var users = await _user.DeleteFeedbackById(id);
            //if (users is null)
            //{
            //    return NotFound("userid not matching");
            //}
            //return Ok(users);
        }
    }
}
