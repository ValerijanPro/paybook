import axios from "axios";

const api = axios.create({
  baseURL: "https://arliving.herokuapp.com/arliving",
  headers: {
    /*       'X-API-KEY': API_KEY, */
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getCategoriesForCode = async (code) => {
  try {
    const response = await api.post(`/pb_scan_qr_code_and_get_categories`, {
      qr_url: code,
    });
    if (response?.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    return console.log(err);
  }
};
