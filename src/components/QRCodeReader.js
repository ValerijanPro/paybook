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

  return (
    <div className={styles.container}>
      <video className={styles.camera} ref={ref} />
      {result ? (
        <a href={result} target="_blank" className={styles.button}>
          {result}
        </a>
      ) : null}
    </div>
  );
};

export default QRCodeReader;
