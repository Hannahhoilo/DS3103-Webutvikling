using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AthletesController : ControllerBase
    {
        private readonly SWContext _context;

        public AthletesController(SWContext context)
        {
            _context = context;
        }



        // GET: api/athletes 

        
        [HttpGet]
        public async Task<ActionResult<List<Athlete>>> Get()
        {
            try
            {
                var athletes = await _context.Athletes.ToListAsync();
                return Ok(athletes);
            }
            catch
            {
                return StatusCode(500);
            }


        }
    }
}