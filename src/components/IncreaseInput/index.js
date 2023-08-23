import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "../../styles/IncreaseInput.module.css";

const IncreaseInput = ({ setCount, min, count }) => {
  const [value, setValue] = useState(count);

  const handleIncrement = () => {
    setValue(value + 1);
    setCount(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
      setCount(value - 1);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    setValue(inputValue);
  };

  return (
    <div className={styles.increaseInput}>
      <button className={styles.button} onClick={handleDecrement}>
        <FaMinus className={styles.icon} />
      </button>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={handleIncrement}>
        <FaPlus className={styles.icon} />
      </button>
    </div>
  );
};

export default IncreaseInput;
