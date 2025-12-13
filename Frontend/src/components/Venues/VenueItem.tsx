import { type IVenue } from "../../interfaces/IVenue";

interface VenueItemProps {
  venue: IVenue;
  onDelete?: () => void; //optional callback fra parent
}

const VenueItem = ({ venue, onDelete }: /*{ venue: IVenue })*/ VenueItemProps) => {
  return (
    <article className="card mt-8 col-span-3 border">
      <h3 className="font-bold">{venue.name}</h3>
      <h3>Id: {venue.id}</h3>
      <h3 className="text-center font-bold">Capacity: {venue.capacity}</h3>
      <img
        className="h-50 m-auto"
        src={`http://localhost:5285/images/${venue.image}`}
        alt={`Bilde av ${venue.name}`}
      />
      {onDelete && (
        <button
        onClick={onDelete}
        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 mt-2"
        > Delete
        </button>
      )}
    </article>
  );
};

export default VenueItem;
