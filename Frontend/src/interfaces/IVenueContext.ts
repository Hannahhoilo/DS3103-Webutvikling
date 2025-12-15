import type { IVenue } from "./IVenue";

export interface IVenueContext {
	venues: IVenue[];
	setSearchByName: (text: string) => void;
	//statusMessage: string;
	getVenueQuantity: () => number;
}

// hver gang man har en funskjon som lagrer noe av noe (en kake) m¨man utsyre den
//en parameter. dette er en regel som ALLTIS gjelder 