import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Navigation.module.css";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "@/context/cart";
import { useRouter } from "next/router";
import { MdWavingHand } from "react-icons/md";
import Swal from "sweetalert2";
import { callWaiter } from "@/pages/api/api";

const Navigation = ({ locationId, table }) => {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const getItemsNumber = () => {
    let count = 0;
    cart?.map((item) => {
      count += item.quantity;
    });

    return count;
  };

  const itemsNumber = getItemsNumber();

  const handleWaiterCall = async () => {
    Swal.fire({
      title: "Kellner rufen",
      html:
        "<p>Bitte rufen Sie den Kellner, wenn Sie Hilfe benötigen.</p>" +
        "<p>Drücken Sie unten auf die Schaltfläche, um Service anzufordern.</p>",
      icon: "info", // Sie können das Symbol nach Belieben ändern, z.B. 'question'
      showCancelButton: true,
      confirmButtonText: "Kellner rufen",
      cancelButtonText: "Abbrechen",
      confirmButtonColor: "#008f97",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await callWaiter(locationId, table);

        if (success) {
          Swal.fire(
            "Kellner gerufen",
            "Der Kellner wurde benachrichtigt.",
            "success"
          );
        } else {
          Swal.fire(
            "Fehler",
            "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
            "error"
          );
        }
      }
    });
  };

  const handleCartPress = () => {
    if (itemsNumber > 0) {
      router.push("/cart");
    } else {
      Swal.fire({
        title: "Leerer Einkaufswagen",
        text: "Ihr Einkaufswagen ist leer. Bitte fügen Sie Produkte hinzu, um fortzufahren.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  useEffect(() => {
    if (router.pathname.includes("product")) {
      setTimeout(() => {
        setStarted(true);
      }, 350);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (itemsNumber) {
      if (started) {
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 300);
      }
    }
  }, [itemsNumber]);

  return (
    <div className={styles.container}>
      <Image
        onClick={() => {
          router.push("/");
        }}
        className={styles.logo}
        src={require("../../../public/icon.webp")}
      />
      <div className={styles.right}>
        <div onClick={handleWaiterCall} className={styles.callWaiter}>
          <MdWavingHand className={styles.callWaiterIcon} size={30} />
        </div>
        <div
          onClick={handleCartPress}
          className={`${styles.cart} ${shakeAnimation ? styles.shake : ""}`}
        >
          {itemsNumber > 0 ? (
            <span className={styles.cartItemsNumber}>{itemsNumber}</span>
          ) : null}
          <FaShoppingCart className={styles.cartIcon} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
