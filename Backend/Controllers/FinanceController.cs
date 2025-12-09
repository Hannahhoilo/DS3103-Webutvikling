using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Context;


namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FinanceController : ControllerBase
{
    private readonly SWContext _context;

    public FinanceController(SWContext context)
    {
        _context = context;
    }

   

 [HttpGet]
public async Task<ActionResult<Finance>> Get()
{
    var finance = await _context.Finances.FirstOrDefaultAsync();
    if (finance == null) return NotFound();

    return Ok(finance);
}

[HttpPost("loan")]
    public async Task<IActionResult> TakeLoan([FromBody] int amount)
    {
        if (amount <= 0)
            return BadRequest("Amount must be greater than zero");

        var finance = await _context.Finances.FirstOrDefaultAsync();
        if (finance == null)
            return NotFound("Finance record not found");

        finance.MoneyLeft += amount;  // 👈 Øk tilgjengelige penger

        await _context.SaveChangesAsync();

        return Ok(finance);
    }

}
