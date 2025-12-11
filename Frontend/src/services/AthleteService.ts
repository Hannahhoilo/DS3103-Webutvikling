import axios from "axios";

// Det er IAthlete som beskriver hvordan objekter "athlete" skal se ut.
import type { IAthlete } from "../interfaces/IAthlete";

import type {
  IAthleteListResponse,
  IAthleteSingleResponse,
} from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5285/api/Athletes"; //gjorde a stor

//Hent alle athletes
export const getAthletes = async (): Promise<IAthleteListResponse> => {
  try {
    //Her prøver vi å hente en liste med Iathletes via "enpoint" som er URL med API-et.
    //Her hjelper axios med å hente API. (axios.get)
    const response = await axios.get<IAthlete[]>(endpoint);

    //Hvis det går bra
    return {
      success: true,
      data: response.data, //Dette er dataen fra API-et
    };

    //Hvis det ikke går som forventet
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

//POST - Legge til ny Athlete

const postAthlete = async (
  athlete: IAthlete
): Promise<IAthleteSingleResponse> => {
  try {
    const response = await axios.post<IAthlete>(endpoint, athlete);

    console.log("POST", response);

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

//put test
const registerAthlete = async (id: number): Promise<IAthleteSingleResponse> => {
  try {
    const response = await axios.put<IAthlete>(`${endpoint}/${id}/register`);

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

export default {
  postAthlete,
  getAthletes,
  registerAthlete,
};
