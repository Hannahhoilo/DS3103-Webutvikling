import { useRef, useContext, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthletesContext } from "../../contexts/AthleteContext";
import type { IAthletesContext } from "../../interfaces/IAthletesContext";

interface AthleteEditInput {
  athlete: IAthlete;
  onClose: () => void; //for å kunne lukke redigeringsboksen.
}

const AthleteEdit = ({ athlete, onClose }: AthleteEditInput) => {
  const { updateAthlete } = useContext(AthletesContext) as IAthletesContext;

  //Inputfeltene i redigeringsvinduet
  const nameInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);

  //Statusmelding for redigeringsboksen
  const [editMessage, seteditMessage] = useState<string>("");

  const savingNewInfo = async () => {
    //Først tar vi en sjekk på at feltene har kommet frem ordentlig.
    // Hvis ikke avbryter vi istedenfor at det skjer noe rart.
    if (nameInput.current == null || priceInput.current == null) {
      return;
    }

    const nameText = nameInput.current.value.trim();
    const priceText = priceInput.current.value.trim();

    if (nameText === "" || priceText === "") {
      seteditMessage("You need to fill inn both name and price");
      return;
    }

    //Pristeksten til tall
    const priceToNumber = Number(priceText);

    if (isNaN(priceToNumber)) {
      seteditMessage("Please fill in all fields");
      return;
    }

    const editedAthlete: IAthlete = {
      id: athlete.id,
      name: nameText,
      gender: athlete.gender,
      price: priceToNumber,
      purchaseStatus: athlete.purchaseStatus,
      image: athlete.image,
    };
    const response = await updateAthlete(editedAthlete);

    if (response.success) {
      //context gir tilbakemelding
      onClose();
    } else {
      seteditMessage("Statusmessage on the top of the page");
    }
  };

  let feedbackMessage = null;

  if (editMessage !== "") {
    feedbackMessage = (
      <p className="text-red-500 mb-4">Status: {editMessage}</p>
    );
  }
  return (
    <section className="mt-3 p-3 border rounded bg-gradient-to-r from-[#063A7F] to-[#11B7FF]  text-white">
      <h3>Edit Athlete</h3>
      <div>
        {/* NAVN */}
        <label>Name</label>
        <input
          className="border bg-white text-black"
          ref={nameInput}
          type="text"
        />
      </div>

      {/* PRIS */}

      <div>
        <label>Price</label>
        <input
          className="border bg-white text-black"
          ref={priceInput}
          type="number"
        />
      </div>

      {/* LAGRE OG AVBRYT KNAPP*/}
      <div className="mt-2 flex gap-2">
        <button onClick={savingNewInfo} className="border px-2">
          Save
        </button>
        <button onClick={onClose} className="border px-2">
          Cancel
        </button>
      </div>
      {feedbackMessage}
    </section>
  );
};

export default AthleteEdit;
