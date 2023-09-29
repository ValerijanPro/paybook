import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/SingleProduct.module.css";
import IncreaseInput from "../IncreaseInput";
import AppButton from "../AppButton";
import CartContext from "@/context/cart";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import Navigation from "../Navigation";
import AppInput from "../AppInput";

const SingleProduct = ({ item, tableNumber, locationId }) => {
  const router = useRouter();

  const options = item.options;
  const onlyOnePrice = options?.length === 1;

  const firstOption = options?.[0];

  const { cart, setCart } = useContext(CartContext);

  const [selectedItems, setSelectedItems] = useState();
  const [waiterNotice, setWaiterNotice] = useState("");

  const productName = item.name;
  const productId = item.id;
  const productImage = item.image;

  const noItems = (inputObject) => {
    let sum = 0;
    if (!inputObject) return true;

    for (const size in inputObject) {
      const item = inputObject[size];
      sum += item.count;
    }
    return !sum;
  };

  const getStructeredBasketArr = (inputObject) => {
    const result = [];

    for (const size in inputObject) {
      if (inputObject.hasOwnProperty(size)) {
        const item = inputObject[size];
        const table = tableNumber;
        const quantity = item.count;
        const sizeLabel = size;
        const nameValue = productName;
        const pricePerUnit = item.pricePerUnit;

        result.push({
          table,
          quantity,
          size: sizeLabel,
          name: nameValue,
          productId: productId,
          pricePerUnit: pricePerUnit,
          productImage: productImage,
          locationId: locationId,
          waiterNotice: waiterNotice,
        });
      }
    }
    return result;
  };

  const handleAddToBasket = () => {
    const basketArr = getStructeredBasketArr(selectedItems);
    setCart([...cart, ...basketArr]);

    if (onlyOnePrice) {
      setSelectedItems({
        [firstOption?.size]: {
          count: 1,
          pricePerUnit: firstOption?.price,
        },
      });
    } else setSelectedItems();

    /*  Swal.fire({
      title: "Produkt(e) zum Warenkorb hinzugefügt",
      text: "Sie haben die folgenden Produkt(e) erfolgreich zu Ihrem Warenkorb hinzugefügt",
      icon: "success",
      confirmButtonText: "Gehe zum Warenkorb",
      showCancelButton: true,
      cancelButtonText: "Schließen",
      confirmButtonColor: "#008f97",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedItems();
        router.push("/cart");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setSelectedItems();
        router.back();
      }
    }); */
  };

  function getCalculatedPrice(items) {
    let totalPrice = 0;

    for (const itemKey in items) {
      if (items.hasOwnProperty(itemKey)) {
        const item = items[itemKey];
        const price = parseFloat(item.pricePerUnit); // Convert pricePerUnit to a number
        const count = item.count;
        const itemTotalPrice = price * count;

        totalPrice += itemTotalPrice;
      }
    }

    return totalPrice.toFixed(2); // Round to 2 decimal places
  }

  function calculateTotalCount(items) {
    let totalCount = 0;

    for (const itemKey in items) {
      if (items.hasOwnProperty(itemKey)) {
        const item = items[itemKey];
        const count = item.count;

        totalCount += count;
      }
    }

    return totalCount;
  }

  useEffect(() => {
    if (onlyOnePrice) {
      setSelectedItems({
        [firstOption?.size]: {
          count: 1,
          pricePerUnit: firstOption?.price,
        },
      });
    }
  }, [firstOption]);

  useEffect(() => {
    if (router.pathname.includes("product")) {
      /*       const itemsFromCart = cart.filter((prod) => prod.productId == item.id);
      let preselectedItems = {};
      itemsFromCart?.map((item) => {
        preselectedItems[item.size] = {
          count: item.quantity,
          pricePerUnit: item.pricePerUnit,
        };
      });

      if (!isEmpty(preselectedItems)) {
        setSelectedItems(preselectedItems);
        setPreselectedItems(preselectedItems);
      } else setSelectedItems(); */
    } else setSelectedItems();
  }, [router.pathname]);

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

  return (
    <div>
      <Navigation locationId={locationId} table={tableNumber} />
      <div className={styles.container}>
        <div
          className={styles.backButton}
          onClick={() => {
            router.back();
          }}
        >
          <BiSolidChevronLeftCircle size={28} className={styles.backIcon} />
        </div>
        <img src={item.image} alt="product" className={styles.image} />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{item.name}</h1>
          {onlyOnePrice ? (
            <h3 className={styles.price}>
              {firstOption.size ? (
                <span className={styles.size}>{firstOption.size}: </span>
              ) : null}{" "}
              {firstOption.price}€
            </h3>
          ) : null}
          {item.ingredients ? (
            <h4 className={styles.ingredients}>{item.ingredients}</h4>
          ) : null}
          {item.description ? (
            <h5 className={styles.description}>{item.description}</h5>
          ) : null}
        </div>
        {onlyOnePrice ? (
          <div className={styles.singleIncButton}>
            <IncreaseInput
              count={selectedItems?.[firstOption?.size]?.count || 1}
              min={1}
              setCount={(count) => {
                setSelectedItems({
                  [firstOption?.size]: {
                    count: count,
                    pricePerUnit: firstOption?.price,
                  },
                });
              }}
            />
          </div>
        ) : (
          <div className={styles.optionItems}>
            {options.map((item) => {
              return (
                <div key={item.size} className={styles.optionItem}>
                  <div>
                    <span className={styles.optionSize}>{item.size}: </span>
                    <span className={styles.optionPrice}>{item.price}€</span>
                  </div>
                  <div className={styles.optionInput}>
                    <IncreaseInput
                      count={selectedItems?.[item?.size]?.count || 0}
                      min={0}
                      setCount={(count) => {
                        setSelectedItems({
                          ...selectedItems,
                          [item?.size]: {
                            count: count,
                            pricePerUnit: item?.price,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <AppInput
          containerClassName={styles.inputContainer}
          className={styles.input}
          value={waiterNotice}
          onChange={(val) => setWaiterNotice(val)}
          placeholder={"Hinweis für den Kellner"}
        />
        {!noItems(selectedItems) || onlyOnePrice /*  &&
        !isEqual(selectedItems, preselectedItems) */ ? (
          <AppButton
            className={styles.button}
            text={`In den Warenkorb`}
            onClick={handleAddToBasket}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SingleProduct;
