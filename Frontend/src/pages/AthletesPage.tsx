import { useContext, useRef, useState, useEffect } from "react";
import { AthletesContext } from "../contexts/AthleteContext";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import AthleteList from "../components/Athletes/AthleteList";
import type { IAthlete } from "../interfaces/IAthlete";

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

  //---- Søkefelt og funkjson ----

  const [filteredAthletes, setFilteredAthletes] = useState<IAthlete[]>([]);

  const nameSearchInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFilteredAthletes(athletes);
  }, [athletes]);

  //funksjonen som kjører når du trykker på "søk"
  const filterAthletes = () => {
    if (nameSearchInput.current == null) {
      return;
    }

    const searchValue = nameSearchInput.current.value.trim().toLowerCase();

    if (searchValue === "") {
      setFilteredAthletes(athletes);
      return;
    }

    const findAthlete = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchValue)
    );

    setFilteredAthletes(findAthlete);
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Athletes</h1>
      <div className="mb-7 flex gap-2">
        <input
          ref={nameSearchInput}
          className="flex-1 border border-grey-300 px-3 py-2"
          type="search"
          placeholder="Search for athlete (first name)"

          // OnChange aktiveres når brukeren søker.
          //Dette oppdaterer searchAthlete også kan vi bruke den teksten for å filtrere på athlete.
        />
        <button onClick={filterAthletes} className="border px-3 py-2 rounded">
          søk
        </button>
      </div>

      {/* Det er her statusmeldingen blir vist, hvis den finnes */}
      {feedbackMessage}

      <AthleteList athletes={filteredAthletes} />
    </section>
  );
};

export default AthletesPage;
