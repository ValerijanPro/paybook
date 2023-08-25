import React, { useContext, useState } from "react";
import styles from "../styles/Cart.module.css";
import Navigation from "@/components/Navigation";
import CartContext from "@/context/cart";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { FaTrashAlt } from "react-icons/fa";
import CartItem from "@/components/CartItem";
import AppButton from "@/components/AppButton";
import { createOrder } from "./api/api";
import Loader from "@/components/Loader";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getItemsNumber = () => {
    let count = 0;
    cart?.map((item) => {
      count += item.quantity;
    });

    return count;
  };

  const getCalculatedPrice = () => {
    let count = 0;
    cart?.map((item) => {
      if (item.quantity) {
        count += item.pricePerUnit * item.quantity;
      }
    });

    return Number.parseFloat(count).toFixed(2);
  };

  const handleOrder = async () => {
    setLoading(true);
    const restaurantId = cart[0]?.locationId;
    const orders = cart
      .map((item) => {
        if (item.quantity)
          return {
            table: item.table,
            quantity: item.quantity,
            size: item.size,
            name: item.name,
          };
      })
      .filter((n) => n);

    const orderBody = { restaurant_id: restaurantId, orders };
    const success = await createOrder(orderBody);
    setLoading(false);
    if (success) {
      setCart([]);
      router.back();
    }
  };

  if (loading) return <Loader order={true} />;

  return (
    <div className={styles.cart}>
      <Navigation locationId={cart[0]?.locationId} table={cart[0]?.table} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div
              className={styles.backButton}
              onClick={() => {
                router.back();
              }}
            >
              <BiSolidChevronLeftCircle size={28} className={styles.backIcon} />
            </div>
          </div>
          <div className={styles.emptyCart}>
            <span className={styles.emptyCartLabel}>
              Leeren Sie den Warenkorb
            </span>
            <FaTrashAlt
              onClick={() => {
                setCart([]);
                router.back();
              }}
              className={styles.trashIcon}
            />
          </div>
        </div>
        <div className={styles.cartItems}>
          {cart?.map((item, index) => {
            if (item.quantity) return <CartItem key={index} item={item} />;
          })}
        </div>
      </div>

      {getItemsNumber() ? (
        <AppButton
          className={styles.button}
          text={`Bestellen Sie ${getItemsNumber()} für ${getCalculatedPrice()} €`}
          onClick={handleOrder}
        />
      ) : null}
    </div>
  );
};

export default Cart;
