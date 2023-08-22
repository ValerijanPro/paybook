import React from "react";
import styles from "../../styles/CategoryItem.module.css";

const CategoryItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={item.image} />
      <h1 className={styles.title}>{item.name}</h1>
    </div>
  );
};

export default CategoryItem;
