import axios from "axios";
import { type IVenue } from "../interfaces/IVenue";

const endpoint = "http://localhost:5285/api/venue";
const endpointImgUpload = "http://localhost:5285/api/venue/imgupload";

interface IVenuesListResponse {
  success: boolean;
  data: IVenue[] | null;
}

const getAllVenues = async (): Promise<IVenuesListResponse> => {
  try {
    const response = await axios.get(endpoint);
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

// tar imot bilde og bildetekst fra bruker skal gjøre to post,
//  en mot venuecontroller og en til bildet til ..
//BNalle funskjoner til service som inneholder axioskall må bruke async
const postVenue = async (venue: IVenue, image: File) => {
  // 1 vi skal nå få axos til å poste bilde i database vi skal få til service til p poste til db via context
  // 2 få service til å få kontakt med bildemappen

  // ALT HER BØR VØRE TRY CATCH

  const response = await axios.post(endpoint, venue);

  //opprette et objekt som pakker inn bildet/filen slik at det kan tas imot av APIet, formdata er en måte å gjre dette på slik at det kan tas i bruk
  const formData = new FormData();
  formData.append("file", image);

  const response2 = await axios({
    //definerer visse ting ved det vi sender
    //konfigurere at det er post, 3- putte bildet inn i kallet, 4-angi noe son heter headers som er noe er vi kaller, et bilde i httpsammenheng noe som kalles multipark fromdata
    //hvor skal det hen? :
    url: endpointImgUpload,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  // rensker slik at det plass til neste bilde
  formData.delete("file");
};

export default { getAllVenues, postVenue };

/* 
vi har nå endepunkt for funny hats så nå må vi legge inn endpoint for imageupload 
*/
