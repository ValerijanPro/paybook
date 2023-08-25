import SingleProduct from "@/components/SingleProduct";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();
  const { tableNumber, locationId } = router.query;

  const [item, setItem] = useState();

  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    setItem(selectedProduct);

    return () => {
      setItem();
    };
  }, []);

  if (!item) return null;

  return (
    <SingleProduct
      item={item}
      locationId={locationId}
      tableNumber={tableNumber}
    />
  );
};

export default Product;
