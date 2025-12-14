import { useRef } from "react";
import VenuesService from "../../services/VenuesService";
import type { IVenue } from "../../interfaces/IVenue";

const ManageVenueItem = () => {
  const idInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const capacityInput = useRef<HTMLInputElement | null>(null);

  const getVenueById = async () => {
    if (
      idInput.current /*samme som != null*/ &&
      idInput.current.value.trim() != ""
    ) {
      //.trim fjerner space før og etter innhold
      //sjekk om det er et tall, prøver å endre fra tekst til tall.
      const idParsed = Number(idInput.current.value);

      if (!isNaN(idParsed)) {
        // idparsed er et tall
        //er det et tall kan vi be venue sercive å få tak i
        const response = await VenuesService.getVenueById(idParsed);

        if (response.success == true) {
          if (nameInput.current != null) {
            nameInput.current.value = response.data?.name || "Ikke satt";
          }
        }
      } else {
        // idparsed er ikke et tall
      }
    }
  };

  const editVenue = async () => {
    if (
      idInput.current &&
      nameInput.current &&
      capacityInput.current &&
      idInput.current.value != "" &&
      nameInput.current.value != "" &&
      capacityInput.current.value != ""
    ) {
      const id = Number(idInput.current.value);
      const name = nameInput.current.value;
      const capacity = Number(capacityInput.current.value);

      if (!isNaN(id)) {
        const editedVenue: IVenue = {
          id: id,
          name: name,
          capacity: capacity,
        };
        VenuesService.putVenue(editedVenue);
      }
    }
  };

  return (
    <section className="max-w-md bg-[#474747] border border-[#11B7FF] rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-center m-4">Change venue</h3>

      {/* */}
      <div className="m-4">
        <div className="flex gap-2">
          {/*<label>ID</label>*/}
          <input
            ref={idInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            type="number"
            placeholder=" ID..."
          />
          <button
            onClick={getVenueById}
            className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-500 transition-colors"
          >
            Get venue by ID
          </button>
        </div>
      </div>

      <div className="m-4">
        <div className="flex gap-2">
          {/*<label>Name</label>*/}
          <input
            ref={nameInput}
            placeholder=" Name..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            type="text"
          />
        </div>
      </div>

      <div className="m-4">
        <div className="flex gap-2">
          {/*<label>Capacity</label>*/}
          <input
            ref={capacityInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            type="number"
            placeholder=" Capacity..."
          />
        </div>
      </div>

      <button onClick={editVenue} className="border badge">
        Save changes
      </button>
      <p>Status: {}</p>
    </section>
  );
};

export default ManageVenueItem;
