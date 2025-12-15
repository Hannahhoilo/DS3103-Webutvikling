import { useRef, useContext, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthletesContext } from "../../contexts/AthleteContext";
import type { IAthletesContext } from "../../interfaces/IAthletesContext";
import AthleteService from "../../services/AthleteService";

const AthleteAdd = () => {
  const { saveAthlete, statusMessage } = useContext(
    AthletesContext
  ) as IAthletesContext;

  const nameInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);
  const genderSelect = useRef<HTMLSelectElement | null>(null);

  const [addMessage, setAddMessage] = useState<string>("");

  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const handleImageChangeAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null && files.length > 0) {
      setUploadImage(files[0]);
    }
  };

  //Dette er funksjonen som blir kalt når knappen "save" trykkes på.
  const saveNewAthlete = async () => {
    setAddMessage("");

    if (
      nameInput.current == null ||
      priceInput.current == null ||
      genderSelect.current == null
    ) {
      return;
    }

    const nameText = nameInput.current.value.trim();
    const priceText = priceInput.current.value.trim();
    const genderText = genderSelect.current.value;

    if (nameText === "" || priceText === "" || genderText === "") {
      setAddMessage("You need to fill inn all boxes");
      return;
    }

    const priceToNumber = Number(priceText);
    if (isNaN(priceToNumber)) {
      setAddMessage("Price must be a number");
      return;
    }

    if (uploadImage == null) {
      setAddMessage("You nned to upload an image");
      return;
    }

    //Dette er det nye objektet som blir lagret i databasen
    const newAthlete: IAthlete = {
      id: 0,
      name: nameText,
      gender: genderText,
      price: priceToNumber,
      purchaseStatus: false,
      image: uploadImage.name,
    };

    const response = await saveAthlete(newAthlete);

    if (response.success) {
      setAddMessage("New athlete saved!");

      nameInput.current.value = "";
      priceInput.current.value = "";
      genderSelect.current.value = "Female";
      setUploadImage(null);
    } else {
      setAddMessage("Failed to create new athlete");
    }
  };

  let feedbackMessage = null;

  if (addMessage !== "") {
    feedbackMessage = <p className="text-red-500 mb-4">Status: {addMessage}</p>;
  }

  return (
    <section className="border p-5">
      {/* NAVN */}
      <div>
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
      {/* GENDER */}
      <div className="p-3">
        <label>Name</label>
        <select className="border bg-white text-black ml-4" ref={genderSelect}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      {/* Bilde */}
      <div className="mb-2">
        <label>Upload Image</label>
        <input
          className="border bg-white text-black"
          ref={priceInput}
          type="file"
          onChange={handleImageChangeAdd}
        />
      </div>
      {/* Knapp */}'
      <div className="mt-2 flex gap-2">
        <button onClick={saveNewAthlete} className="border px-2">
          Save
        </button>
      </div>
      {feedbackMessage}
    </section>
  );
};

export default AthleteAdd;
