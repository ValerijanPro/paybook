import React from "react";
import styles from "../../styles/CartItem.module.css";

const CartItem = ({ item }) => {
  console.log(item);

  return (
    <div className={styles.container}>
      <img
        alt="product-image"
        className={styles.image}
        src={item.productImage}
      />
      <div className={styles.middleSection}>
        <h1 className={styles.title}>{item.name}</h1>
        {item.size ? <h5 className={styles.count}>{item.size}</h5> : null}
      </div>
      <div className={styles.rightSection}>
        <h3 className={styles.price}>
          {item.quantity} X {item.pricePerUnit}€
        </h3>
        {/*   <h5 className={styles.count}>Die Menge: {item.quantity}</h5> */}
      </div>
    </div>
  );
};

export default CartItem;
