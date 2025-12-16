import axios from "axios";
import type { IFinanceResponse } from "../interfaces/ResponseInterfaces";

const fEndpoint = "http://localhost:5285/api/finance";

const getMoney = async (): Promise<IFinanceResponse> => {
  try {
    const response = await axios.get(fEndpoint);
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


// sender lånebeløp til backend og får oppdatert Finance tilbake
const takeLoan = async (amount: number): Promise<IFinanceResponse> => {
  try {
    const response = await axios.post(`${fEndpoint}/loan/${amount}`);
    return {
      success: true,
      data: response.data,
    };
  } catch{
    return {
      success: false,
      data: null,
    };
  }
};



//oppdater values
const purchaseAthlete = async (athleteId: number) => {
  try {
    const response = await axios.put(`${fEndpoint}/purchase/${athleteId}`);

    return {
      success: true,
      data: response.data
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};


export default {
  getMoney,
  takeLoan,
  purchaseAthlete
};
