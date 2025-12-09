/*
----------------------------
git pull origin main
git add .
git commit -m "Beskriv hva du har gjort"
git push origin main
----------------------------
For start av 
backend:
dotnet watch run


Frontend:
npm run dev
----------------------------

Context er en teknikk i React for å
tilgjengeliggjøre data og tilstand globalt
(innenfor et definert scope)
• Context blir direkte tilgjengelig for
komponentene som trenger informasjon
(og å oppdateres automatisk hvis
tilstanden på info endres).
• Offisielle nettsider:
https://react.dev/reference/react/useCo
ntext

*/

using Microsoft.AspNetCore.Mvc;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;


// DETTE ER EN TEST 

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
// alle apikontrollere skal arvve fra controllerbase


public class VenueController : ControllerBase
{
	private readonly SWContext _context;
	public VenueController(SWContext context)
	{
		_context = context;
	}

 	// GET
 	[HttpGet] // endepunkt http://localohost:XXXX/venue ? 
 	public async Task<ActionResult<List<Venue>>> Get()
 	{
 		try
 		{
 			List<Venue> venues = await _context.Venues.ToListAsync();
 			return Ok(venues);
 		}
 		catch
 		{
 			// Noe gikk galt på server
 			return StatusCode(500); 
 		}
 	}

 	// POST
 	[HttpPost]
 	public async Task<IActionResult> Post(Venue venue)
 	{
 		try
 		{
 			_context.Venues.Add(venue);
 			await _context.SaveChangesAsync();
 			return Created();
 		}
 		catch
 		{
 			return StatusCode(500, "Server side error when getting venues");
 		} 
 	}

	// PUT = redigere informasjon
	[HttpPut]
	public async Task<IActionResult> Put (Venue editedVenue)
	{
		try
		{
			_context.Venues.Entry(editedVenue).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			// NoContent betyr "OK, men ingen data å returnere"
			return NoContent();
		}
		catch
		{
			return StatusCode(500);
		}
	}
}
/*
🎯 Hvorfor arve fra ControllerBase?
1. Gir tilgang til alle verktøy en API trenger

ControllerBase inneholder metoder som:

Ok()

NotFound()

BadRequest()

Created()

NoContent()

Problem()

Disse brukes hele tiden i REST API-er.
// */

//public class VenueController(Context _context) : ControllerBase
//{
	// GET


	// PUT = redigere informasjon
	/*[HttpPut]
	public async Task<IActionResult> Put (Venue editedVenue)
	{
		_context
	} */
//}


/*Mottar HTTP-forespørsler (GET, POST, PUT, DELETE)

Snakker med logikken i programmet (services, repositories)

Returnerer svar (f.eks. JSON-data) tilbake til klienten (frontend, Postman, etc.)

| Del av prosjektet | Rolle                                                    |
| ----------------- | -------------------------------------------------------- |
| **Controller**    | Håndterer HTTP-requests og returnerer svar               |
| **Model**         | Beskriver data (f.eks. `Fish`)                           |
| **Repository**    | Henter og lagrer data                                    |
| **Interface**     | Definerer “kontrakt” for hvordan repo/metoder skal se ut |
*/