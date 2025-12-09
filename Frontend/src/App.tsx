import { AthletesProvider } from "./contexts/AthleteContext";
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <>
      <AthletesProvider>
        <AppRouting />
      </AthletesProvider>
    </>
  );
}

export default App;
