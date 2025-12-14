import { useContext, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthletesContext } from "../../contexts/AthleteContext";
import type { IAthletesContext } from "../../interfaces/IAthletesContext";
import AthleteEdit from "./AthleteEdit";

interface AthleteItemData {
  athlete: IAthlete;
  isLeftColumn: boolean; // Er athlete på venstre eller høyre side.
}

const AthleteItem = ({ athlete, isLeftColumn }: AthleteItemData) => {
  const imageUrl = "http://localhost:5285/images/" + athlete.image;

  //state for å vise redigeringsboksen eller ikke.
  const [showEditWindow, setshowEditWindow] = useState<boolean>(false);

  const editWindowposition = isLeftColumn
    ? "right-full mr-4"
    : "left-full ml-4";

  let editWindow = null;

  if (showEditWindow) {
    editWindow = (
      <div className={"absolute top-0 " + editWindowposition}>
        <AthleteEdit
          athlete={athlete}
          onClose={() => setshowEditWindow(false)} // lukker vinduet
        />
      </div>
    );
  }

  const { deleteAthlete } = useContext(AthletesContext) as IAthletesContext;

  const deleteClick = async () => {
    const warningmessage = window.confirm(
      "Are you sure you want to delete this athlete?"
    );

    if (warningmessage) {
      await deleteAthlete(athlete.id);
    } else {
      //Gjør ingenting
      return;
    }
  };

  return (
    //kortet med tennis spillere
    //"overflow-hidden" for at bilde ikke skal stikke utenfor boksen.

    <article className="relative mb-2">
      <div className="border rounded-lg overflow-hidden shadow-md">
        <section className="relative">
          <img
            src={imageUrl}
            alt={`Picture of ${athlete.name}`}
            className="w-full h-48 object-cover"
          />

          {/* Knapper for Edit og Delete. */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setshowEditWindow(true)}
              className="bg transparent border border-white text-white text-xs px-3 py-1 rounded cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#063A7F]
              hover:to-[#11B7FF]
              transition
              active:scale-94
              "
            >
              Edit
            </button>
            <button
              onClick={deleteClick}
              className="bg transparent border border-white text-white text-xs px-3 py-1 rounded cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#7F0606]
              hover:to-[#FF4D4D]
              transition
              active:scale-94"
            >
              Delete
            </button>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#063A7F] to-[#11B7FF]  text-white px-6 pt-4 pb-5 text-left">
          <h3 className="font-bold text-lg">
            {athlete.id}. {athlete.name} ({athlete.gender})
          </h3>
          <p className="mb-1">Price: {athlete.price} NOK</p>
          {/* Kjøpt eller tilgjengelig */}
          <div className="mt-4 flex justify-end">
            <span
              className={
                "inline-block px-4 py-1 rounded-md text-sm font-semibold  " +
                (athlete.purchaseStatus ? "bg-green-600" : "bg-orange-500")
              }
            >
              {athlete.purchaseStatus ? "Purchased" : "Available"}
            </span>
          </div>
        </section>

        {/* Redigeringsboks */}
        {editWindow}
      </div>
    </article>
  );
};

export default AthleteItem;
