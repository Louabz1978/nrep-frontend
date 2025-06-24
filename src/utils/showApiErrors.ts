import { AxiosError } from "axios";

// handle error messages returned from backend, gets: error response, returns: errors messages notifications
export function showApiErrors(
  error: AxiosError & { SHOW_NETWORK_ERROR: boolean }
) {
  console.log({ error });
  try {
    if (error?.code == "ERR_NETWORK" && error?.SHOW_NETWORK_ERROR)
      return "checkInternet";
    else if (error?.code == "ERR_NETWORK") return "serverError";
    else if (error?.code == "ECONNABORTED") return "timeoutError";
    else if (error?.response?.status == 500) {
      return "serverError";
    } else if (error?.response?.status == 404) {
      return "404 not found";
    } else {
      return "genericError";
    }
  } catch (err) {
    console.log(err);
    return "genericError";
  }
}
