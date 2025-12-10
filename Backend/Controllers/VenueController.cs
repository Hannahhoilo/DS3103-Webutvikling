
using Microsoft.AspNetCore.Mvc;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
//using VenuesAPI.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
// alle apikontrollere skal arvve fra controllerbase


public class VenueController : ControllerBase
{
	private readonly SWContext _context;
	private readonly IWebHostEnvironment _webHostEnvironment;
	public VenueController(SWContext context, IWebHostEnvironment webHostEnvironment)
	{
		_context = context;
		_webHostEnvironment = webHostEnvironment;
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
 			return Created("", venue);
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

	// DELETE - fra slides 
	[HttpDelete("{id}")]

	public async Task<IActionResult> Delete(int id)
	{
		Venue? venue = await _context.Venues.FindAsync(id);
		if (venue != null)
		{
			_context.Venues.Remove(venue);
			await _context.SaveChangesAsync();
			return NoContent(); //NoContent er en 204-meldingsom betyr alt OK trenger ikke returnere noe 
		}
		else
		{
			return NotFound();
		}
	}

	// Endpoint for image upload 
	[HttpPost("imgupload")]

		public async Task<IActionResult> PostImage(IFormFile file) // <- iformfile er metoden for å hente bildet/pdf/fil
	{
		try
		{
			/* filstien der bildet skal lagres, deretter kommer en 
			metode som har med filstrøm å gjøre, er et objekt som tar tak i bildedata og bokstavelgi 
			talkt lagrer det i bildemappen*/
			//filsti: 
			string webRootPath = _webHostEnvironment.WebRootPath;
			// kommer ril å være en kombinasjon av webroottbpathen med hvor det ligger og navnet på bildet : 
			
			Console.WriteLine("WebRootPath: " + _webHostEnvironment.WebRootPath);


			string absolutePath = Path.Combine(
				webRootPath,
				"images",
				file.FileName
			);
			Console.WriteLine("Saving to: " + absolutePath);

			using (var fileStream = new FileStream(absolutePath, FileMode.Create))
			{
				//nårman lager en filstrøm lager ma n en åpen forbindelse, den må åpnes og lukkes. sørger for at man åpner og lukker filstrømmen t il riktig tid 
				await file.CopyToAsync(fileStream);
			}

			return Created();
		}
		catch
		{
			return StatusCode(500, "Image upload failed in server!"); // serverside feil
		}
	}

	/*
	public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
	{
		if (file == null || file.Length == 0)
		return BadRequest("No file uploaded!");

		try
		{
			string webRootPath = _webHostEnvironment.WebRootPath;
			string imagesPath = Path.Combine(webRootPath, "images");

			if (!Directory.Exists(imagesPath))
			Directory.CreateDirectory(imagesPath);

			string filePath = Path.Combine(imagesPath, file.FileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			return Ok(new { FileName = file.FileName });
		}
		catch
		{
			return StatusCode(500, "Error uploading the image.");
		}
	} */
}





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
/*
using Microsoft.AspNetCore.Mvc;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
//using VenuesAPI.Models;

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