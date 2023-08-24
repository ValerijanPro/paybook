import React, { useEffect } from "react";
import { MagnifyingGlass, Watch } from "react-loader-spinner";
import styles from "../../styles/Loader.module.css";

const Loader = ({ loaded, order }) => {
  useEffect(() => {
    if (loaded) {
      document.body.classList.remove("no-scroll");
    } else document.body.classList.add("no-scroll");
  }, [loaded]);

  if (loaded) return null;
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        {order ? (
          <Watch
            height="70"
            width="150"
            radius="48"
            color="#008f97"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <MagnifyingGlass width="70" color="#008f97" />
        )}
      </div>
    </div>
  );
};

export default Loader;
