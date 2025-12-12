import { useContext } from "react";
import { AthletesContext } from "../../contexts/AthleteContext";
import { FinanceContext } from "../../contexts/FinanceContext";


function FinanceAthletes() {
  const athletesContext = useContext(AthletesContext);
  const financeContext = useContext(FinanceContext);


  if (!athletesContext) {
    return <p>Error: AthletesContext not available</p>;
  }

  const { athletes } = athletesContext;

  return (
    <div>
      
      <h2 className="text-2xl font-semibold mb-4">Available Athletes</h2>

      {financeContext?.statusMessage && (
  <div className="bg-red-200 text-red-800 font-semibold p-2 mb-4"> 
    {financeContext.statusMessage}
  </div> //status message når ikke råd
)}

      <div className="flex flex-wrap gap-5">
        {athletes
          .filter((a) => !a.purchaseStatus) // viser bare tilgjengelige atleter
          .map((a) => (
           <div
              key={a.id}
              className="border border-[#68b8ce] p-4 w-[200px] h-[320px] rounded-lg shadow-sm flex flex-col"
                >

              
            
             <img
             src={`http://localhost:5285/images/${a.image}`}
             alt={a.name}
             className="w-full rounded-lg mb-2" //h-32 gir høyde, kan endres/fjernes men bildene blir ulike
            />

              <h3 className="text-lg font-medium">{a.name}</h3>
              <p className="text-sm text-white-700">Gender: {a.gender}</p>
              <p className="text-sm text-white-700">Price: {a.price}</p>

              <p className="text-sm font-medium mt-1 font-bold">
                Registered: {a.purchaseStatus ? "Yes" : "No"}
              </p>
                    <button
                      className="bg-black text-white mx-auto mt-auto rounded-md p-3 hover:bg-gray-500"
                       onClick={async () => {
                    const success = await financeContext?.purchaseAthlete(a.id, a.price);

                    if (success) {
                    athletesContext?.registerAthlete(a.id);
                 }
                    }}>
                      Register
                  </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FinanceAthletes;
