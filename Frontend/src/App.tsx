import { FinanceProvider } from "./contexts/FinanceContext";
import AppRouting from "./routing/AppRouting";
//tennisbilde: 
// https://pngtree.com/so/tennis-ball-logo-vector 

function App() {
  return (
    <><FinanceProvider> {/* fjern eller endre her*/}
      <AppRouting />
      </FinanceProvider>
    </>
  );
}

export default App;
