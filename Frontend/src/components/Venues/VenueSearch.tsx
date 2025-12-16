import { useContext } from "react";
import type { IVenueContext } from "../../interfaces/IVenueContext"; 
import { VenueContext } from "../../contexts/VenueContext";

 const VenueSearch = () => {
	const vContext = useContext(VenueContext) as IVenueContext;

	return(
		<input
		type="text"
		placeholder="Search venue by name..."
		onChange={(e) => vContext.setSearchByName(e.target.value)}
		className="border rounded px-4 py-2"
		/>
	)
 }

 export default VenueSearch;