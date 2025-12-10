
//import VenueItem from "../components/Venues/VenueItem";
import VenueList from "../components/Venues/VenueList";

const VenuePage = () => {
  return (
    <section>
      <div className="max-w-3xl mx-auto mt-12 text-center p-8">
        <p className="text-lg text-[#F3F3F3]">
          Here you can look at venues and see capacity
        </p>

        <div className="card mt-8">
          <p className="text-white">Example venue card</p>
          <span className="badge mt-2">Capacity: 500</span>
        </div> 
      </div>
      <VenueList />
    </section>
  );
};
{/* deeznuts */}

export default VenuePage;
