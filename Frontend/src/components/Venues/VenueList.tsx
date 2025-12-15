import { useContext, useEffect, useState, type ReactNode } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

const VenueList = () => {


  // Context kobling 
  const { venues, getVenueQuantity } = 
  useContext(VenueContext) as IVenueContext;

  // Lokal state for sorteringsfunskjonen
  const [sortedVenues, setSortedVenues] = useState<IVenue[]>([]);

  // staten til sorteringsfunskjonen
  // https://www.w3schools.com/typescript/typescript_union_types.php
  const [sortCapacity, setSortCapacity] = useState<"default" | "asc" | "desc">("default");

  // knapp kaller på funskjon i venuesservise som sender http-forespørsel til backend for å hente alle venues
  /*const getVenues = async () => {
    const response = await VenuesService.getAllVenues();

    if (response.success && response.data != null) {
      setVenues(response.data);
    }
  }; */

  // reseter sorteringslisten når en venue endres
  useEffect(() => {
    setSortedVenues(venues);
  }, [venues]);

  // sorteringsfusnkjon ut ifra hvor mange plasser det er på en stadion
  const sortByCapacity = (order: "default" | "asc" | "desc") => {
    setSortCapacity(order);

    setSortedVenues((prev) => {
      // kopi av arayet før sortering, så original arrayet ikke blir endret på noen måte
      const copySortedVenue = [...prev];
      if (order === "asc") copySortedVenue.sort((a, b) => a.capacity - b.capacity);
      if(order === "desc") copySortedVenue.sort((a, b) => b.capacity - a.capacity);
      return copySortedVenue;
    });
  };
{/*
  const getVenuesJSX = (): ReactNode => {
    const venuesJSX = venues.map((venue, index) => {
      return <VenueItem key={"venue" + index} venue={venue} />;
    });
    return venuesJSX;
  }; */}

  return (
    <>
      <header className="mb-2">
        <h3 className="text-xl">Our venues</h3>
      </header>

      <section className="mb-4 grid grid-flow-col gap-4 items-center">
        {/*
        <button
          onClick={getVenues}
          className="border border-fuchsia-700 px-2 py-1 text-white bg-fuchsia-600 hover:bg-fuchsia-500 cursor-pointer"
        >
          Show venues
        </button> */}
        <select
          value={sortCapacity}
          onChange={(e) =>
            sortByCapacity(e.target.value as "default" | "asc" | "desc")
          }
          className="border rounded px-2 py-1"
        >
          <option value="default">Default</option>
          <option value="asc">Ascending 🔼</option>
          <option value="desc">Descending 🔽</option>
        </select>
      </section>

      <section>
        <p className="mb-2">Total venues: {getVenueQuantity()}</p>
      </section>

      <section className="grid grid-cols-12 gap-4">
        {sortedVenues.map((venue, index) => (
          <VenueItem key={"venue" + index} venue={venue} />
        ))}
      </section>

      {/*<section className="grid grid-cols-12 gap-2">{getVenuesJSX()}</section>*/}
    </>
  );
};

export default VenueList;