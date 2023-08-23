import React from "react";
import styles from "../../styles/ProductItem.module.css";
import { HiPlusCircle } from "react-icons/hi";

const ProductItem = ({ item, onClick }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <img alt="product-image" className={styles.image} src={item.image} />
      <div className={styles.middleSection}>
        <h1 className={styles.title}>{item.name}</h1>
        <h4 className={styles.description}>
          {item.ingredients || item.description}
        </h4>
      </div>
      <div className={styles.rightSection}>
        <h3 className={styles.price}>{item.options?.[0]?.price}€</h3>
        <HiPlusCircle size={20} className={styles.plusIcon} />
      </div>
    </div>
  );
};

export default ProductItem;
