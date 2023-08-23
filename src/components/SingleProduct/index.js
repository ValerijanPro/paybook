import React, { useEffect, useState } from "react";
import styles from "../../styles/SingleProduct.module.css";
import IncreaseInput from "../IncreaseInput";
import AppButton from "../AppButton";

const SingleProduct = ({ item }) => {
  const options = item.options;
  const onlyOnePrice = options?.length === 1;

  const firstOption = options?.[0];

  const [selectedItems, setSelectedItems] = useState();

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

  return (
    <div className={styles.container}>
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
      {selectedItems ? (
        <AppButton
          className={styles.button}
          text={`Bestellen Sie ${calculateTotalCount(
            selectedItems
          )} für ${getCalculatedPrice(selectedItems)}€`}
          onClick={() => console.log(selectedItems)}
        />
      ) : null}
    </div>
  );
};

export default SingleProduct;
