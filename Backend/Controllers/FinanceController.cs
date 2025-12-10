using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Context;


namespace Backend.Controllers; //hei

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

//test
    [HttpPut("{id}/register")]
public async Task<IActionResult> RegisterAthlete(int id)
{
    var athlete = await _context.Athletes.FindAsync(id);

    if (athlete == null)
        return NotFound();

    athlete.PurchaseStatus = true;

    await _context.SaveChangesAsync();

    return Ok(athlete);
}


}
