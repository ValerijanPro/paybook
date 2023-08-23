import React, { useContext } from "react";
import styles from "@/styles/Navigation.module.css";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "@/context/cart";

const Navigation = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src={require("../../../public/icon.webp")}
      />
      <div className={styles.cart}>
        {cart?.length > 0 ? (
          <span className={styles.cartItemsNumber}>{cart.length}</span>
        ) : null}
        <FaShoppingCart className={styles.cartIcon} size={30} />
      </div>
    </div>
  );
};

export default Navigation;
