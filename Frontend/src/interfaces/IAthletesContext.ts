import type { IAthlete } from "./IAthlete";
import type { IAthleteSingleResponse } from "./ResponseInterfaces";

export interface IAthletesContext {
  athletes: IAthlete[];
  getAthleteQuantity: () => number;
  saveAthlete: (newAthlete: IAthlete) => Promise<IAthleteSingleResponse>;
  statusMessage: string;
  loadAthletes: () => Promise<void>;
}
