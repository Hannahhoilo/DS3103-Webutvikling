import type { IAthlete } from "../../interfaces/IAthlete";

interface AthleteItemData {
  athlete: IAthlete;
}

const AthleteItem = ({ athlete }: AthleteItemData) => {
  const imageUrl = "http://localhost:5285/images/" + athlete.image;

  return (
    //kortet med tennis spillere
    <article className="border mb-2 rounded-lg overflow-hidden shadow-md">
      <img
        src={imageUrl}
        alt={`Picture of ${athlete.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="bg-gradient-to-r from-[#063A7F] to-[#11B7FF]  text-white px-6 pt-4 pb-5 text-left">
        <h3 className="font-bold text-lg">
          {athlete.name} ({athlete.gender})
        </h3>
        <p className="mb-1">Price: {athlete.price} NOK</p>
        {/* Kjøpt eller tilgjengelig */}
        <div className="mt-4 flex justify-end">
          <span
            className={
              "inline-block px-4 py-1 rounded-md text-sm font-semibold  " +
              (athlete.purchaseStatus ? "bg-green-600" : "bg-orange-500")
            }
          >
            {athlete.purchaseStatus ? "Purchased" : "Available"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default AthleteItem;
