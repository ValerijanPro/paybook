import React, { useState } from "react";
import styles from "../../styles/AppButton.module.css";

const AppButton = ({ text, className, onClick, disabled }) => {
  const [opacity, setOpacity] = useState(1);

  function handleButtonClick() {
    setOpacity(0.5);
    setTimeout(() => {
      setOpacity(1);
    }, 150);
  }

  return (
    <div
      onClick={() => {
        handleButtonClick();
        if (onClick) onClick();
      }}
      style={{ opacity: opacity }}
      className={`${styles.button} ${className} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {text}
    </div>
  );
};

export default AppButton;
