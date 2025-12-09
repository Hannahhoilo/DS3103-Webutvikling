//import VenueAdd from "../components/Venues/VenueAdd";
//import VenueItem from "../components/Venues/VenueItem";
//import VenueList from "../components/Venues/VenueList";

const VenuePage = () => {
  return (
    /*
    <section className="min-h-screen bg-[#222222] p-0 m-0">


      <header className="w-full bg-gradient-to-r from-[#063A7F] to-[#11B7FF] py-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#BBFF00]">Venues 🎾</h1>
      </header>


      <div className="max-w-3xl mx-auto mt-12 text-center p-8">
        <p className="text-lg text-[#F3F3F3]">
          Here you can look at venues and see capacity
        </p>

        <div className="mt-8 p-6 bg-[#474747] rounded-xl border border-[#11B7FF] shadow-md">
          <p className="text-white">Example venue card</p>

          <span className="inline-block mt-2 px-4 py-1 bg-[#BBFF00] text-[#222222] rounded-full font-semibold">
            Capacity: 500
          </span>
        </div>
      </div>



    </section>
    */
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
    </section>
  );
};

export default VenuePage;
