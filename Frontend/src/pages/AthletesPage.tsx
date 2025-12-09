import { useContext } from "react";
import { AthletesContext } from "../contexts/AthleteContext";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import AthleteList from "../components/Athletes/AthleteList";

const AthletesPage = () => {
  const { athletes, statusMessage } = useContext(
    AthletesContext
  ) as IAthletesContext;

  let feedbackMessage = null;

  if (statusMessage !== "")
    // !== betyr "ikke lik". Så hvis denne if setningen er TRUE så kommer statusMessage.
    // hvis det er en tekst i statusMessage så blir det laget en <p> som vier teksten i rødt.{
    feedbackMessage = (
      <p className="text-red-500 mb-4">Status: {statusMessage}</p>
    );

  return (
    <section className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Athletes</h1>

      {/* Det er her statusmeldingen blir vist, hvis den finnes */}
      {feedbackMessage}

      <AthleteList athletes={athletes} />
    </section>
  );
};

export default AthletesPage;
