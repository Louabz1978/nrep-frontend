import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "@/utils/jsonParse";
import { debounce } from "lodash";

let SHOW_NETWORK_ERROR: boolean = true;
async function setShowNetworkErrorTrue(): Promise<void> {
  SHOW_NETWORK_ERROR = true;
}

const axiosClient = axios.create({
  // importing the base api url from env
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

axiosClient.interceptors.request.use((config) => {
  const token = jsonParse(secureLocalStorage.getItem("ACCESS_TOKEN") as string)
    ?.data;
  // check if the api call require token and put it in header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // pass locale to backend
  config.headers["Accept-Language"] =
    jsonParse(secureLocalStorage.getItem("USER_LOCALE") as string)?.data ??
    "en";

  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    console.log({ error });
    // navigate to login page if the token is expired
    if (typeof window != "undefined" && error?.response?.status === 401) {
      window.location.replace(`${window.location.origin}/login`);
      // or refresh token
    }
    let err = error;
    // handle general errors messages
    if (error.code == "ERR_NETWORK" && SHOW_NETWORK_ERROR) {
      err = { ...error, SHOW_NETWORK_ERROR: SHOW_NETWORK_ERROR };
      SHOW_NETWORK_ERROR = false;
      const debouncedFetch = debounce(setShowNetworkErrorTrue, 5000);
      debouncedFetch();
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
