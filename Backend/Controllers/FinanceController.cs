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

        finance.MoneyLeft += amount;  // Øk tilgjengelige penger

        await _context.SaveChangesAsync();

        return Ok(finance);
    }



//oppdater values
[HttpPut("purchase/{athleteId}")]
public async Task<IActionResult> PurchaseAthlete(int athleteId)
{
    var athlete = await _context.Athletes.FindAsync(athleteId);
    if (athlete == null) return NotFound();
    if (athlete.PurchaseStatus) return BadRequest("Already purchased");

    var finance = await _context.Finances.FirstOrDefaultAsync();
    if (finance == null) return NotFound();

     if (finance.MoneyLeft < athlete.Price)
    {
        return BadRequest("Not enough money to purchase this athlete");
    }

    finance.MoneyLeft -= athlete.Price;
    finance.MoneySpent += athlete.Price;
    finance.NumberOfPurchases++;

    athlete.PurchaseStatus = true;

    await _context.SaveChangesAsync();

    return Ok(finance);
}


}
