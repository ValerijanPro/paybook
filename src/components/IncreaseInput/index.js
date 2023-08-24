import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "../../styles/IncreaseInput.module.css";

const IncreaseInput = ({ setCount, min, count }) => {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    setCount(inputValue);
  };

  useEffect(() => {
    if (!count) setCount(min);
  }, [count]);

  return (
    <div className={styles.increaseInput}>
      <button className={styles.button} onClick={handleDecrement}>
        <FaMinus className={styles.icon} />
      </button>
      <input
        type="number"
        className={styles.input}
        value={count}
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={handleIncrement}>
        <FaPlus className={styles.icon} />
      </button>
    </div>
  );
};

export default IncreaseInput;
