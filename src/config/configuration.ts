import Cookies from "js-cookie";

export const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${
      typeof window !== "undefined" && Cookies.get("taskapp")
    }`,
    "Content-Type": "application/json",
  },
};
