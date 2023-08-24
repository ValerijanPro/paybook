import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { getCategoriesForCode } from "./api/api";
import Loader from "@/components/Loader";
import styles from "../styles/Location.module.css";
import CategoryItem from "@/components/CategoryItem";
import Navigation from "@/components/Navigation";
import CartContext from "@/context/cart";

const Location = () => {
  const router = useRouter();
  const { code } = router.query;

  const { cart, setCart } = useContext(CartContext);

  const [categories, setCategories] = useState();
  const [locationInfo, setLocationInfo] = useState();
  const [tableNumber, setTableNumber] = useState(null);

  function changeTheme(location) {
    if (location?.background_image) {
      const body = document.body;
      body.style.backgroundImage = `url(${location.background_image})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundPosition = "center";
    }
    let newTheme = document.documentElement.getAttribute("data-theme");
    if (location?.background_color == "black") {
      newTheme = "dark";
    } else if (location?.background_color == "white") {
      newTheme = "light";
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  const getLoactionData = async () => {
    const data = await getCategoriesForCode(code);
    if (data) {
      console.log(data.restaurant);
      changeTheme(data.restaurant);
      setLocationInfo(data.restaurant);
      setCategories(data.categories);
    }
  };

  function extractAndCheck(inputString) {
    const parts = inputString.split(":");
    const lastPart = parts[parts.length - 1];

    if (lastPart.includes("T")) {
      const numberAfterT = lastPart.match(/\d+/);
      if (numberAfterT) {
        return parseInt(numberAfterT[0]);
      }
    }

    return null;
  }

  useEffect(() => {
    if (code) {
      getLoactionData();
      const number = extractAndCheck(code);
      setTableNumber(number);

      const storageCart = JSON.parse(localStorage.getItem(`cart-${code}`));
      if (storageCart) setCart(storageCart);
    }
  }, [code]);

  useEffect(() => {
    if (locationInfo?.id) {
      const storageCart = JSON.parse(
        localStorage.getItem(`cart-${locationInfo.id}`)
      );
      if (storageCart) setCart(storageCart);
    }
  }, [locationInfo?.id]);

  useEffect(() => {
    if (cart && locationInfo?.id) {
      localStorage.setItem(`cart-${locationInfo?.id}`, JSON.stringify(cart));
    }
  }, [cart]);

  if (!categories || !locationInfo) return <Loader />;

  return (
    <div>
      <Navigation locationId={locationInfo?.id} table={tableNumber} />
      <div className={styles.container}>
        <img className={styles.image} alt="logo" src={locationInfo.image} />
        <h1 className={styles.locationTitle}>{locationInfo.name}</h1>
        <h2 className={styles.locationAddress}>{locationInfo.address}</h2>
        <div className={styles.categories}>
          <h3 className={styles.categoriesTitle}>Kategorie wählen</h3>
          {categories.map((item) => (
            <CategoryItem
              locationId={locationInfo.id}
              key={item.id}
              item={item}
              tableNumber={tableNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
