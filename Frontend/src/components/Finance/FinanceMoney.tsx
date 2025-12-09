import type { IFinance } from "../../interfaces/IFinance";

const FinanceMoney = ({ money }: { money: IFinance }) => {
  return (
    <article>
      <h3>Money left: {money.moneyLeft}</h3>
      <h3>Purchases: {money.numberOfPurchases}</h3>
      <h3>Money spent: {money.moneySpent}</h3>
    </article>
  );
};

export default FinanceMoney;
