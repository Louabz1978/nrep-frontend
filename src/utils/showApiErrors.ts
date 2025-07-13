import type { AxiosError } from "axios";

// handle error messages returned from backend, gets: error response, returns: errors messages notifications
export function showApiErrors(
  error: AxiosError & { SHOW_NETWORK_ERROR: boolean }
) {
  console.log({ error });
  try {
    if (error?.code == "ERR_NETWORK" && error?.SHOW_NETWORK_ERROR)
      return "عذراً, حدثت مشكلة في الاتصال";
    else if (error?.code == "ERR_NETWORK") return "serverError";
    else if (error?.code == "ECONNABORTED") return "timeoutError";
    else if (error?.response?.status == 500) {
      return "حدثت مشكلة في السيرفر";
    } else if (error?.response?.status == 404) {
      return "لم يتم العثور على المعلومات";
    } else {
      return "عذر حدث خطأ ما";
    }
  } catch (err) {
    console.log(err);
    return "عذراً, حدث خطأ ما";
  }
}
