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
      setStatusMessage("Finance data ikke lastet");
      return false;
    }

    // sjekk moneyleft
    if ((finance.moneyLeft ?? 0) < athletePrice) {
      setStatusMessage("Ikke nok spenn, ta et lån!");
      return false;
    }

    const response = await FinanceService.purchaseAthlete(athleteId);

    if (response.success && response.data) {
      setFinance(response.data); // Oppdater økonomi
      setStatusMessage("");
      return true;
    }

    setStatusMessage("Kunne ikke oppdatere finance");
    return false;
  };

  // tar lånet
  const takeLoan = async (amount: number): Promise<boolean> => {
    const response = await FinanceService.takeLoan(amount);

    if (response.success && response.data) {
      setFinance(response.data); // Oppdater økonomi
      setStatusMessage("");
      return true;
    }

    setStatusMessage("Lånet kunne ikke gjennomføres");
    return false;
  };

  const value: IFinanceContext = {
    finance,
    loadFinance,
    purchaseAthlete,
    takeLoan, 
    statusMessage,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
