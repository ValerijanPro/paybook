import React, { useState } from "react";
import { useZxing } from "react-zxing";
import styles from "../../styles/QRCodeReader.module.css";
import { useRouter } from "next/router";

const QRCodeReader = () => {
  const router = useRouter();

  const [result, setResult] = useState();
  const { ref } = useZxing({
    onResult(result) {
      const textResult = result.getText();
      if (!textResult?.includes("http")) {
        router.push(`/location?code=${textResult}`);
      } else setResult(result.getText());
    },
    onError(err) {
      console.log(err);
      /* router.back(); */
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
