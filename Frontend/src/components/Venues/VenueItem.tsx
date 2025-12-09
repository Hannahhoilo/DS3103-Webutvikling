import { type IVenue } from "../../interfaces/IVenue";

const VenueItem = ({ venue }: { venue: IVenue }) => {
  return (
    <article className="col-span-3 border">
      <h3 className="text-center font-bold">(Name: {venue.name})</h3>
      <h3 className="text-center font-bold">(Id: {venue.id}) </h3>
      <h3 className="text-center font-bold">(Capacity: {venue.capacity})</h3>
      <img
        className="h-50 m-auto"
        src={`http://localhost:5285/images/${venue.image}`}
        alt={`Bilde av ${venue.name}`}
      />
    </article>
  );
};

export default VenueItem;
