import { useState, createContext, type ReactNode, useEffect } from "react";

import type { IAthlete } from "../interfaces/IAthlete";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import AthleteService from "../services/AthleteService";
import type { IAthleteSingleResponse } from "../interfaces/ResponseInterfaces";

//Context-objekt
//eslint-disable-next-line react-refresh/only-export-components
export const AthletesContext = createContext<IAthletesContext | null>(null);

interface Props {
  children: ReactNode;
}

export const AthletesProvider = ({ children }: Props) => {
  //State - Starter med en tom liste så henter data fra API
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const loadAthletesService = async (): Promise<void> => {
    // Kaller på getAthletes() som er laget i AthleteService
    const response = await AthleteService.getAthletes();

    if (response.success && response.data) {
      setAthletes(response.data);
      setStatusMessage("");
    } else {
      setStatusMessage("Can't find athletes from server");
    }
  };

  useEffect(() => {
    loadAthletesService();
  }, []); //Tom array her betyr at det skal kjøres 1 gang. Når det lastes første gang.
  // uten [] blir det HTTP-spam så det er viktig.

  const getAthleteQuantity = (): number => {
    return athletes.length;
  };

  const saveAthlete = async (
    newAthlete: IAthlete
  ): Promise<IAthleteSingleResponse> => {
    const response = await AthleteService.postAthlete(newAthlete);

    if (response.success && response.data) {
      const newAthleteDb = response.data;

      setAthletes((prev) => [newAthleteDb, ...prev]);
      setStatusMessage("");
    } else {
      setStatusMessage("Failed to create new athlete");
    }
    return response;
  };


  //ian test
    const registerAthlete = async (id: number): Promise<void> => {
      const response = await AthleteService.registerAthlete(id);
  
      if (response.success && response.data) {
        const updatedAthlete = response.data;
  
        setAthletes((prev) =>
          prev.map((a) => (a.id === id ? updatedAthlete : a))
        );
  
        setStatusMessage("");
      } else {
        setStatusMessage("Failed to register athlete");
      }
    };


  const value: IAthletesContext = {
    athletes,
    getAthleteQuantity,
    saveAthlete,
    statusMessage,
    loadAthletes: loadAthletesService,
    registerAthlete //ian test
  };

  
  return (
    <AthletesContext.Provider value={value}>
      {children}
    </AthletesContext.Provider>
  );
};
