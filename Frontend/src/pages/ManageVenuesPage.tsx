import VenueAdd from "../components/Venues/VenueAdd";

const ManageVenuesPage = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Manage Venues</h1>
      <p className="text-lg">Here you can manage venues</p>
      <VenueAdd />
    </section>
  );
};

export default ManageVenuesPage;
