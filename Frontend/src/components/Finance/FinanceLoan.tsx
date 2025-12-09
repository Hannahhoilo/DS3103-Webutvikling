import { useState, useEffect } from "react";
import FinanceService from "../../services/FinanceService";

export default function LoanComponent() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [setFinance] = useState<any>(null);

  useEffect(() => {
    FinanceService.getMoney().then(setFinance);
  }, []);

  const handleLoan = async () => {
    if (loanAmount <= 0) {
      alert("Beløpet må være større enn 0");
      return;
    }

    const updatedFinance = await FinanceService.takeLoan(loanAmount);
    setFinance(updatedFinance);
    setLoanAmount(0);
  };

  return (
    <div>
      

      <input 
      className="w-50 px-3 py-2 rounded-lg bg-white/10 border border-white/20 
         text-white placeholder-white/60
         focus:outline-none focus:ring-2 focus:ring-blue-400" //endre her senere 
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(Number(e.target.value))}
        placeholder="Loan amount"
      />

      <button 
      className="bg-black text-white mx-auto my-6 rounded-md p-3 hover:bg-gray-500"
      onClick={handleLoan}>Take Loan</button>
    </div>
  );
}
