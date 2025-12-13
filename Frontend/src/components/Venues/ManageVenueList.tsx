import { useState, type ReactNode } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";
import VenueItem from "./VenueItem";

const ManageVenueList = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  const getVenues = async () => {
    const response = await VenuesService.getAllVenues();

    if (response.success && response.data != null) {
      setVenues(response.data);
    }
  };

  const deleteVenueFunction = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    const deleteResult = await VenuesService.deleteVenue(id);
    if (deleteResult.success) {
      // fjernes fra state slik at ui oppdateders
      setVenues((prev) => prev.filter((v) => v.id !== id));
    } else {
      //Putte inn html status istedenfor
      alert("Could not delete venue!" + deleteResult.error);
    }
  }; // send som prop til managevenueitem


  const getVenuesJSX = (): ReactNode => {
    const venuesJSX = venues.map((venue, index) => {
      return <VenueItem key={"venue" + index} venue={venue} onDelete={() => deleteVenueFunction(venue.id)} />;
    });
    return venuesJSX;
  };

  return (
    <>
      <header className="mb-2">
        <h3 className="text-xl">Our venues</h3>
      </header>
      <section className="mb-2">
        <button
          onClick={getVenues}
          className="border border-fuchsia-700 px-2 py-1 text-white bg-fuchsia-600 hover:bg-fuchsia-500 cursor-pointer"
        >
          Show venues
        </button>
      </section>
      <section className="grid grid-cols-12 gap-2">{getVenuesJSX()}</section>
    </>
  );
};

export default ManageVenueList;
