import { useEffect, useState } from "react";
import FinanceMoney from "../components/Finance/FinanceMoney";
import FinanceAthletes from "../components/Finance/FinanceAthletes";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";
import LoanComponent from "../components/Finance/FinanceLoan";

const FinancesPage = () => {
  const [finance, setFinance] = useState<IFinance | null>(null);

  useEffect(() => {
    FinanceService.getMoney().then((res) => {
      if (res.success && res.data) {
        setFinance(res.data);
      }
    });
  }, []);

  return (
    <>
      {/* Viser hvor mye penger som er igjen */}

      <div className="flex justify-center gap-30"> {/*skaper distanse mellom komponenter*/}
      <FinanceMoney/> 
      <LoanComponent/>
      </div>

      <hr style={{ border: "3px solid black", margin: "20px 0" }} /> {/*linje som deler komponetene(midlertidig)*/}

      {/* Viser alle tilgjengelige athletes */}
      <FinanceAthletes />
    </>
  );
};

export default FinancesPage;
