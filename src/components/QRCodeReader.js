import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import styles from "../styles/QRCodeReader.module.css";

const QRCodeReader = () => {
  const [result, setResult] = useState();
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        window.open(result, "_blank");
      }, 3000);
    }
  }, [result]);

  return (
    <div className={styles.container}>
      <video className={styles.camera} ref={ref} />
    </div>
  );
};

export default QRCodeReader;
