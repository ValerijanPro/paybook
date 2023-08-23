import React from "react";
import styles from "../../styles/CategoryItem.module.css";
import { useRouter } from "next/router";

const CategoryItem = ({ item, locationId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/category",
      query: {
        locationId: locationId,
        categoryId: item.id,
      },
    });
  };

  return (
    <div onClick={handleClick} className={styles.container}>
      <img className={styles.logo} src={item.image} />
      <h1 className={styles.title}>{item.name}</h1>
    </div>
  );
};

export default CategoryItem;
