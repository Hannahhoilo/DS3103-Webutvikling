import { type IFinance } from "./IFinance";

export interface IFinanceContext {
  finance: IFinance | null;
  loadFinance: () => Promise<void>;
  purchaseAthlete: (athleteId: number, athletePrice: number) => Promise<boolean>;
  statusMessage: string;
  takeLoan: (amount: number) => Promise<boolean>;
}

