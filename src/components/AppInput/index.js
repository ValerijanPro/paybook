import React from "react";
import styles from "../../styles/AppInput.module.css";

const AppInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  className,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${className}`}
        {...otherProps}
      />
    </div>
  );
};

export default AppInput;
