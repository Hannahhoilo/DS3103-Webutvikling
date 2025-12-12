import { createContext, useState, useEffect, type ReactNode } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";

export const FinanceContext = createContext<IFinanceContext | null>(null);

interface Props {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: Props) => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Hent finance fra backend ved oppstart
  const loadFinance = async () => {
    const response = await FinanceService.getMoney();
    if (response.success && response.data) {
      setFinance(response.data);
      setStatusMessage("");
    }
  };

  useEffect(() => {
    loadFinance();
  }, []);

  // Purchase Athlete 
  const purchaseAthlete = async (
    athleteId: number,
    athletePrice: number
  ): Promise<boolean> => {
    if (!finance) {
      setStatusMessage("Finance data not loaded");
      return false;
    }

    //Ikke nok penger
    if ((finance.moneyLeft ?? 0) < athletePrice) {
      setStatusMessage("Not enough money to purchase this athlete");
      return false;
    }

    // Bruk penger via backend
    const response = await FinanceService.purchaseAthlete(athleteId);
    if (response.success && response.data) {
      setFinance(response.data);
      setStatusMessage("");
      return true; // Kjøpet gikk bra
    }

    setStatusMessage("Could not update finance");
    return false;
  };

  const value: IFinanceContext = {
    finance,
    loadFinance,
    purchaseAthlete,
    statusMessage,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
