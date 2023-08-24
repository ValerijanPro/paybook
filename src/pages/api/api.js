import axios from "axios";
import Swal from "sweetalert2";

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
      return response.data;
    }
  } catch (err) {
    return console.log(err);
  }
};

export const getItemsForCategory = async (restaurantId, categoryId) => {
  try {
    const response = await api.post(
      `/pb_get_products_by_restaurant_and_category`,
      {
        restaurant_id: Number.parseInt(restaurantId),
        category_id: Number.parseInt(categoryId),
      }
    );
    if (response?.data) {
      return response.data;
    }
  } catch (err) {
    return console.log(err);
  }
};

export const createOrder = async (body) => {
  try {
    const response = await api.post(`/pb_create_order`, body);
    if (response.status == 200 || response.status == 201) {
      Swal.fire({
        title: "Bestellung erfolgreich",
        text: "Ihre Bestellung wurde erfolgreich aufgenommen. Vielen Dank für Ihre Wahl!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return true;
    } else {
      Swal.fire({
        title: "Bestellung fehlgeschlagen",
        text: "Es tut uns leid, Ihre Bestellung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        icon: "error", // You can use the 'error' icon to indicate the error.
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Bestellung fehlgeschlagen",
      text: "Es tut uns leid, Ihre Bestellung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
      icon: "error", // You can use the 'error' icon to indicate the error.
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  }
};

export const callWaiter = async (restaurantId, table) => {
  try {
    const response = await api.post(
      `/pb_get_products_by_restaurant_and_category`,
      {
        restaurant_id: Number.parseInt(restaurantId),
        table: table,
      }
    );
    if (response?.data) {
      return response.data;
    }
  } catch (err) {
    return console.log(err);
  }
};
