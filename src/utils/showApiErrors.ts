import { AxiosError } from "axios";

// handle error messages returned from backend, gets: error response, returns: errors messages notifications
export function showApiErrors(
  error: AxiosError & { SHOW_NETWORK_ERROR: boolean },
  t: (value: string) => string
) {
  console.log({ error });
  try {
    if (error?.code == "ERR_NETWORK" && error?.SHOW_NETWORK_ERROR)
      return t("checkInternet");
    else if (error?.code == "ERR_NETWORK") return t("serverError");
    else if (error?.code == "ECONNABORTED") return t("timeoutError");
    else if (error?.response?.status == 500) {
      return t("serverError");
    } else {
      return t("genericError");
    }
  } catch (err) {
    console.log(err);
    return t("genericError");
  }
}
