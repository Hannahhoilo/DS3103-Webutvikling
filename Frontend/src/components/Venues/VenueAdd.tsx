import { useRef, useState, type ChangeEvent } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";

const VenueAdd = () => {
  const [image, setImage] = useState<File | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const capacityInput = useRef<HTMLInputElement | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null) {
      setImage(files[0]);
      console.log(files[0]);
    }
  };

  const saveVenue = () => {
    if (
      nameInput.current &&
      nameInput.current.value.trim() != "" &&
      capacityInput.current &&
      capacityInput.current.value.trim() != "" &&
      image != null
    ) {
      // Error
      const capacity = parseInt(capacityInput.current.value);
      if (isNaN(capacity)) {
        alert("You can only use numbers!");
        return;
      }

      const newVenue: IVenue = {
        name: nameInput.current.value,
        capacity: parseInt(capacityInput.current.value),
        image: image.name, // image objektet sitt filnavn
      };

      VenuesService.postVenue(newVenue, image);
    }
  };

  return (
    <section className="max-w-md bg-[#474747] border border-[#11B7FF] rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Save new venue</h3>
      <div className="mb-1">
        <label>Name</label>
        <input ref={nameInput} className="border" type="text" />
      </div>

      <div className="mb-1">
        <label>Capacity</label>
        <input
          ref={capacityInput}
          className="border"
          type="number"
          placeholder="Number of people"
        />
      </div>

      <div className="mb-1">
        <label>
          Bilde
          <input onChange={changeHandler} type="file" />
        </label>
      </div>

      <button
        onClick={saveVenue}
        className="border px-2 py-1 bg-green-600 text-white cursor-pointer"
      >
        Save venue
      </button>
      <p>Status: {}</p>
    </section>
  );
};

export default VenueAdd;
