import Navigation from "@/components/Navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { getItemsForCategory } from "./api/api";
import styles from "../styles/Category.module.css";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import CartContext from "@/context/cart";

const CategoryPage = () => {
  const router = useRouter();
  const { locationId, categoryId, tableNumber } = router.query;
  const [products, setProducts] = useState();
  const [locationInfo, setLocationInfo] = useState();

  const { cart, setCart } = useContext(CartContext);

  const getCategoryItems = async () => {
    const data = await getItemsForCategory(locationId, categoryId);
    if (data) {
      setLocationInfo(data.restaurant);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    if (locationId && categoryId) getCategoryItems();
  }, [router.query]);

  useEffect(() => {
    if (locationId) {
      const storageCart = JSON.parse(
        localStorage.getItem(`cart-${locationId}`)
      );
      if (storageCart) setCart(storageCart);
    }
  }, [locationId]);

  useEffect(() => {
    if (cart) {
      localStorage.setItem(`cart-${locationId}`, JSON.stringify(cart));
    }
  }, [cart]);

  if (!products || !locationInfo) return <Loader />;

  return (
    <div className={styles.container}>
      <Navigation locationId={locationId} table={tableNumber} />

      <div
        className={styles.backButton}
        onClick={() => {
          router.back();
        }}
      >
        <BiSolidChevronLeftCircle size={28} className={styles.backIcon} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <img
            alt="location"
            src={locationInfo.image}
            className={styles.logo}
          />
          <h1 className={styles.title}>
            Wählen Sie bitte einen Artikel aus {locationInfo.name}
          </h1>
        </div>
        <div className={styles.products}>
          {products.map((item) => {
            return (
              <ProductItem
                onClick={() => {
                  localStorage.setItem("selectedProduct", JSON.stringify(item));
                  setTimeout(() => {
                    router.push({
                      pathname: "/product",
                      query: {
                        locationId: locationId,
                        tableNumber: tableNumber,
                      },
                    });
                  }, 250);
                }}
                key={item.id}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryPage);
