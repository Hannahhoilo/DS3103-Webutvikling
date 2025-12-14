import { useState, type ReactNode } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";
import VenueItem from "./VenueItem";

const VenueList = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  // https://www.w3schools.com/typescript/typescript_union_types.php
  const [sortCapacity, setSortCapacity] = useState<"default" | "asc" | "desc">("default");

  const getVenues = async () => {
    const response = await VenuesService.getAllVenues();

    if (response.success && response.data != null) {
      setVenues(response.data);
    }
  };

  const sortByCapacity = (order: "default" | "asc" | "desc") => {
    setSortCapacity(order);

    setVenues((prev) => {
      // kopi av arayet før sortering, så state ikke muteres direkte 
      const copy = [...prev];
      if (order === "asc") copy.sort((a, b) => a.capacity - b.capacity);
      if(order === "desc") copy.sort((a, b) => b.capacity - a.capacity);
      return copy;
    });
  };

  const getVenuesJSX = (): ReactNode => {
    const venuesJSX = venues.map((venue, index) => {
      return <VenueItem key={"venue" + index} venue={venue} />;
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

        <select
          value={sortCapacity}
          onChange={(e) => sortByCapacity(e.target.value as "default" | "asc" | "desc")}
        >
          <option value="default">Default</option>
          <option value="asc">Ascending 🔼</option>
          <option value="desc">Descending 🔽</option>
        </select>
        

      </section>
      <section className="grid grid-cols-12 gap-2">{getVenuesJSX()}</section>
    </>
  );
};

export default VenueList;
