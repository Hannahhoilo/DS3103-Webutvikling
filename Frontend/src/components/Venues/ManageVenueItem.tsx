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
    <section>
      <h3>Rediger Venue</h3>
      <div>
        <label>ID</label>
        <input ref={idInput} className="border" type="number" />
        <button onClick={getVenueById} className="border">
          Get venue by ID
        </button>
      </div>

      <div>
        <label>Name</label>
        <input ref={nameInput} className="border" type="text" />
      </div>
	  <div>
		<label>Capacity</label>
		<input ref={capacityInput} className="border" type="number" />
	  </div>
      <button onClick={editVenue} className="border">
        Save changes
      </button>
      <p>Status: {}</p>
    </section>
  );
};

export default ManageVenueItem;
