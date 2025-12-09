import { useEffect, useState } from "react";
import { type IAthlete } from "../../interfaces/IAthlete";
import AthleteService from "../../services/AthleteService";
import type { IAthleteListResponse } from "../../interfaces/ResponseInterfaces";



function FinanceAthletes() {
    
  const [athletes, setAthletes] = useState<IAthlete[]>([]);

 useEffect(() => {
  AthleteService.getAthletes()
    .then((res: IAthleteListResponse) => {
      if (res.success && res.data) {
        setAthletes(res.data);
      }
    })
    .catch(() => {
      console.error("fant ikke atleter");
    });
}, []);


  return (
    
   <div>
  <h2 className="text-2xl font-semibold mb-4">Available Athletes</h2>

  <div className="flex flex-wrap gap-5">
    {athletes
      .filter((a) => a.purchaseStatus)
      .map((a) => (
        <div
          key={a.id}
          className="border border-[#68b8ce] p-4 w-[200px] rounded-lg shadow-sm"
        >
          <img
            src={a.image}
            alt={a.name}
            className="w-full rounded-lg mb-2"
          />

          <h3 className="text-lg font-medium">{a.name}</h3>
          <p className="text-sm text-white-700">Gender: {a.gender}</p>
          <p className="text-sm text-white-700">Price: {a.price}</p>

          <p className="text-sm font-medium mt-1">
            Available:  {a.purchaseStatus ? "Yes" : "No"}
            
          </p>

          <button
            className="bg-black text-white block mx-auto mt-5 rounded-md py-2 px-4 hover:bg-gray-700 transition"
          >
            Register
          </button>
        </div>
      ))}
  </div>
</div>

)}

export default FinanceAthletes;
