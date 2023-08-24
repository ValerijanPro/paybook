import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Orders.module.css";

const colorCycle = ["var(--secondary-color)", "#F5F5DCee"];
let colorIndex = 0;
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [firstOrder, setFirstOrder] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [orderColor, setOrderColor] = useState(colorCycle[colorIndex]);

  const [restaurant, setRestaurant] = useState({});
  const [showWaitingScreen, setShowWaitingScreen] = useState(true);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);

  const [swippedDirection, setSwippedDirection] = useState("");

  useEffect(() => {
    setRestaurant(JSON.parse(sessionStorage.getItem("restaurant")));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("2s " + showWaitingScreen);
      if (showWaitingScreen && restaurant) {
        tryGetOrders().then(() => {});
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [restaurant, showWaitingScreen]);

  useEffect(() => {}, [orders]);

  const tryGetOrders = async () => {
    try {
        console.log("Asd "+restaurant.id);
      const response = await fetch(
        "https://arliving.herokuapp.com/arliving/pb_get_order_by_restaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            restaurant_id: restaurant.id,
          }),
        }
      );

      if (response.error) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (
        responseData.message &&
        responseData.message == "No orders found for this restaurant"
      ) {
        console.log("show waiting screen = true");
        setShowWaitingScreen(true);
        return;
      }
      let tmpArray = responseData.order;
      let tmp = [];

      for (let x of tmpArray) {
        tmp.push(x);
      }

      console.log("show waiting screen = false");
      setFirstOrder(tmp.at(0));
      setOrders(tmp);
      //console.log(orders.length+" orders");
      setShowWaitingScreen(false);
    } catch (error) {
      //setError('An error occurred while fetching data');
    }
  };

  const handleButtonClick = () => {
    //clear current orders
    /*  let x = orders.length;
        while(x>0){
            x = x-1;
            orders.pop();
        } */

    

    

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setOrders([]);
      tryGetOrders().then(() => {
        colorIndex = (colorIndex + 1) % colorCycle.length;
        setOrderColor(colorCycle[colorIndex]);
      });
      
    }, 1000);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchMoveX(0);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX;
    setTouchMoveX(deltaX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchMoveX) > 50) {
      // Swipe distance threshold to trigger action
      if (touchMoveX < 0) {
        // Swipe left
        handleButtonClick();
        setSwippedDirection("L");
      }
      if (touchMoveX > 0) {
        // Swipe left
        handleButtonClick();
        setSwippedDirection("R");
      }
      // You can implement handling for swipe right here if needed
    }
    //setSwippedDirection("");
    setTouchMoveX(0);
  };

  const orderStyle = {
    transform: `translateX(${touchMoveX}px)`,
    transition: touchMoveX === 0 ? "transform 0.3s ease-out" : "none",
  };

  return (
    <div
      className={`${styles.container} ${
        showWaitingScreen ? styles.noBackground : ""
      }`}
    >
      {!showWaitingScreen && (
        <div
        style={{
            ...orderStyle,
            backgroundColor: orderColor,
          }}
          className={`${styles.order} ${isAnimating ? ((swippedDirection=="R")?styles.animatingRight:styles.animating) : ""}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.table}>Table: {firstOrder.table}</div>
          <div className={styles.orderBody}>
            {orders.map((order, index) => (
              <div className={styles.orderProduct} key={index}>
                <div
                  style={{
                    fontSize: "30px",
                    width: "100%",
                    paddingBottom: "10px",
                  }}
                >
                  {order.name}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>Quantity: {order.quantity}</div>
                  <div style={{ width: "50%" }}>Size: {order.size}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.break}></div>
          <button
            style={{ position: "absolute", bottom: "5%", width: "85%" }}
            onClick={handleButtonClick}
            type="button"
          >
            Finish
          </button>
        </div>
      )}
      {orders.length === 0 && (
        <div className={styles.noOrdersBody}>
          <div
            className={styles.imageContainer}
            style={{
              paddingTop: "5%",
              paddingBottom: "5%",
            }}
          >
            <img
              className={styles.image}
              src={restaurant.image}
              alt="Background"
            />
          </div>
          <div
            className={`${styles.upAndDown} ${styles.centeredText}`}
            style={{
              paddingTop: "5%",
              fontFamily: "Tahoma",
              fontSize: "4vh",
            }}
          >
            Waiting for orders
          </div>
          <div
            className={`${styles.shake} ${styles.imageContainer}`}
            style={{
              paddingTop: "15%",
              paddingBottom: "15%",
            }}
          >
            <img
              className={styles.image}
              style={{ width: "60vw" }}
              src="temp2.png"
              alt="Background"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;