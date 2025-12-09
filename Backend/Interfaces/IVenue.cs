// INTERFACE

namespace Backend.Interfaces;

interface IVenue
{
    int Id { get; set; }
    string Name{ get; set; }
	int Capacity{ get; set; }
	string Image { get; set; }
}

/*
Table 3. Venue:
-
Id
- Name
- Capacity***
- Image

***Capacity is the number of people that fit into the venue
*/