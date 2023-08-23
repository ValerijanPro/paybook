import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCategoriesForCode } from "./api/api";
import Loader from "@/components/Loader";
import styles from "../styles/Location.module.css";
import CategoryItem from "@/components/CategoryItem";
import Navigation from "@/components/Navigation";

const Location = () => {
  const router = useRouter();
  const { code } = router.query;

  const [categories, setCategories] = useState();
  const [locationInfo, setLocationInfo] = useState();

  const getLoactionData = async () => {
    const data = await getCategoriesForCode(code);
    if (data) {
      setLocationInfo(data.restaurant);
      setCategories(data.categories);
    }
  };

  useEffect(() => {
    if (code) getLoactionData();
  }, [code]);

  if (!categories || !locationInfo) return <Loader />;

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <img className={styles.image} alt="logo" src={locationInfo.image} />
        <h1 className={styles.locationTitle}>{locationInfo.name}</h1>
        <h2 className={styles.locationAddress}>{locationInfo.address}</h2>
        <div className={styles.categories}>
          <h3 className={styles.categoriesTitle}>Choose category</h3>
          {categories.map((item) => (
            <CategoryItem
              locationId={locationInfo.id}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
