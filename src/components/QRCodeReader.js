import React, { useState } from "react";
import { useZxing } from "react-zxing";
import styles from "../styles/QRCodeReader.module.css";

const QRCodeReader = () => {
  const { ref } = useZxing({
    onResult(result) {
      window.open(result.getText(), "_blank");
    },
  });

  return (
    <div className={styles.container}>
      <video ref={ref} />
    </div>
  );
};

export default QRCodeReader;
