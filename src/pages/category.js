import Navigation from "@/components/Navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getItemsForCategory } from "./api/api";
import styles from "../styles/Category.module.css";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import SingleProduct from "@/components/SingleProduct";

const CategoryPage = () => {
  const router = useRouter();
  const { locationId, categoryId } = router.query;
  const [products, setProducts] = useState();
  const [locationInfo, setLocationInfo] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const getCategoryItems = async () => {
    const data = await getItemsForCategory(locationId, categoryId);
    if (data) {
      setLocationInfo(data.restaurant);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    if (locationId && categoryId) getCategoryItems();
  }, [router.query]);

  if (!products || !locationInfo) return <Loader />;

  return (
    <div className={styles.container}>
      <Navigation />

      <div
        className={styles.backButton}
        onClick={() => {
          if (!selectedProduct) {
            router.back();
          } else setSelectedProduct();
        }}
      >
        <BiSolidChevronLeftCircle size={25} className={styles.backIcon} />
      </div>
      {!selectedProduct ? (
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <img
              alt="location"
              src={locationInfo.image}
              className={styles.logo}
            />
            <h1 className={styles.title}>
              Wählen Sie bitte einen Artikel aus {locationInfo.name}
            </h1>
          </div>
          <div className={styles.products}>
            {products.map((item) => {
              return (
                <ProductItem
                  onClick={() => {
                    setSelectedProduct(item);
                  }}
                  key={item.id}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <SingleProduct item={selectedProduct} />
      )}
    </div>
  );
};

export default CategoryPage;
