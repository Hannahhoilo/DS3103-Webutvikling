
//import VenueItem from "../components/Venues/VenueItem";
import VenueList from "../components/Venues/VenueList";
import VenueSearch from "../components/Venues/VenueSearch";
import { VenueProvider } from "../contexts/VenueContext";

const VenuePage = () => {
  return (
    <VenueProvider>
      <section>
        <div className="max-w-3xl mx-auto mt-12 text-center p-8">
          <p className="text-lg text-[#F3F3F3]">
            Here you can look at venues and see capacity
          </p>

          <div className="card mt-8">
            <p className="text-white">Example venue card</p>
          </div>
        </div>
        <VenueSearch />
        <VenueList />
      </section>
    </VenueProvider>
  );
};

export default VenuePage;
