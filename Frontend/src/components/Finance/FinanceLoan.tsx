import { useState, useEffect } from "react";
import FinanceService from "../../services/FinanceService";

   function LoanComponent() {
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [setFinance] = useState<any>(null);

  useEffect(() => {
    FinanceService.getMoney().then(setFinance);
  }, []);

  const handleLoan = async () => {
    const amount = Number(loanAmount);

    if (amount <= 0) return;

    const updatedFinance = await FinanceService.takeLoan(amount);

   
    setFinance(updatedFinance); //oppdaterer ved butten klikk

    setLoanAmount("");
  };

  return (
    <div>
      
      <input
  type="number"
  value={loanAmount}
  onChange={(e) =>
  setLoanAmount(e.target.value === "" ? "" : Number(e.target.value))}
  placeholder="Loan amount"
/>


      <button
        className="bg-black text-white mx-auto my-6 rounded-md p-3 hover:bg-gray-500"
        onClick={handleLoan}
      >
        Take Loan
      </button>
    </div>
  );
}


export default LoanComponent;