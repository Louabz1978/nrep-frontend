import type { AxiosError } from "axios";

// handle error messages returned from backend, gets: error response, returns: errors messages notifications
export function showApiErrors(
  error: unknown,
  defaultErrorMessage: string = "عذراً, حدث خطأ ما"
) {
  console.log({ error });
  try {
    if (error instanceof Error && error.message === "CANCELED") return; // Ignore canceled queries

    if (isAxiosError(error)) {
      if (error?.code == "ERR_NETWORK" && error?.SHOW_NETWORK_ERROR)
        return "عذراً, حدثت مشكلة في الاتصال";
      else if (error?.code == "ERR_NETWORK") return "serverError";
      else if (error?.code == "ECONNABORTED") return "timeoutError";
      else if (error?.response?.status == 500) {
        return "حدثت مشكلة في السيرفر";
      } else if (error?.response?.status == 404) {
        return "المحتوى المطلوب غير موجود";
      } else {
        return (
          (typeof error?.response?.data?.detail == "string"
            ? error?.response?.data?.detail
            : error?.response?.data?.detail?.[0]?.msg) ?? defaultErrorMessage
        );
      }
    } else {
      // Handle non-Axios errors or generic errors
      return defaultErrorMessage;
    }
  } catch (err) {
    console.log(err);
    return defaultErrorMessage;
  }
}

function isAxiosError(error: unknown): error is AxiosError & {
  SHOW_NETWORK_ERROR: boolean;
} & {
  response: { data: { detail: { msg: string }[] | string } };
} {
  return (error as AxiosError).isAxiosError !== undefined;
}
