import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Orders.module.css";
import {BiSolidBell, BiSolidBellRing} from "react-icons/bi"
import bellSound from '../../public/bellSound.wav'; // Replace with the actual path to your .wav file

const colorCycle = ["var(--secondary-color)", "#F5F5DCee"];
let colorIndex = 0;
let addedFlag = false;

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  //const [firstOrder, setFirstOrder] = useState({});

  const [orderArray, setOrderArray] = useState([]);
  const [orderIndex, setOrderIndex] = useState(-1);

  const [isAnimating, setIsAnimating] = useState(false);
  const [orderColor, setOrderColor] = useState(colorCycle[colorIndex]);

  const [restaurant, setRestaurant] = useState({});

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);

  const [swippedDirection, setSwippedDirection] = useState("");

  const [isBellRinging, setIsBellRinging] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  

  useEffect(() => {
    setRestaurant(JSON.parse(sessionStorage.getItem("restaurant")));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if ( restaurant) {
        tryGetOrders().then(() => {});
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [restaurant]);

  useEffect(() => {
    
  }, [orderArray]);

  useEffect(() => {
    // Create an audio element
    const audioElement = new Audio(bellSound);
    audioElement.loop = true; // Set the loop property to true

    // Play or pause the audio based on the isBellRinging flag
    if (isBellRinging) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset the audio to the beginning
    }

    return () => {
      // Cleanup: Pause the audio and release resources when component unmounts
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [isBellRinging]);

  const tryGetOrders = async () => {
    try {
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

      if (
        responseData.message &&
        responseData.message == "No orders found for this restaurant"
      ) {

        
        //setShowWaitingScreen(true);
        return;
      }

      //check for calls
      
      let call = responseData.call;
      if (call) {
        setIsBellRinging(true);
        /*setInterval(()=>{
          setIsBellRinging(!isBellRinging);
        }, 1000)*/
        
        // add the called table to the notification list
        setDataArray(prevDataArray => [...prevDataArray, { text: "Tisch " + call }]);
   
      }

      //get the orders
      let tmpArray = responseData.order;
      let tmp = [];

      for (let x of tmpArray) {
        tmp.push(x);
      }

      if(tmp.length!=0) {

        if(orderArray.length==0){
          
          setOrders(tmp);
 
          setOrderArray(prevOrderArray => [...prevOrderArray, tmp]);

          setOrderIndex(0);
          return;
        }
        
        setOrderArray(prevOrderArray => [...prevOrderArray, tmp]);

        
      }
     
   
      
    } catch (error) {
      //setError('An error occurred while fetching data');
    }
  };

  const handleButtonClick = () => {
    setSwippedDirection("D");
    setIsAnimating(true);
    
    setTimeout(() => {
      //setOrderArray([]);
      const arrayCopy = orderArray.slice();
      const updatedArray = arrayCopy.filter((_, index) => index !== orderIndex);
      setOrderArray(updatedArray);

      if(updatedArray.length==0) {

        setOrderIndex(-1);
        setOrders([]);
      }
      else{

        setOrderIndex((orderIndex+1)%updatedArray.length);
        setOrders(orderArray[orderIndex]);
      }
      
      tryGetOrders().then(() => {
        setIsAnimating(false);
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
        
        //handleButtonClick();
        setSwippedDirection("L");
        setIsAnimating(true);
        setTimeout(() => {
          const arrayCopy = orderArray.slice();
          const updatedArray = arrayCopy.filter((_, index) => index !== orderIndex);
          setOrderArray(updatedArray);
          

          colorIndex = (colorIndex + 1) % colorCycle.length;
          setOrderColor(colorCycle[colorIndex]);
          setIsAnimating(false);
          /*if(orderIndex != 0)
            setOrderIndex((orderIndex - 1) % (orderArray.length));
          else{
            setOrderIndex(orderArray.length - 1);
          }*/
        }, 1000)
        
      }
      if (touchMoveX > 0) {
        // Swipe right
        //handleButtonClick();
        setSwippedDirection("R");
        setIsAnimating(true);
        setTimeout(() => {
          colorIndex = (colorIndex + 1) % colorCycle.length;
          setOrderColor(colorCycle[colorIndex]);
          setIsAnimating(false);
          setOrderIndex((orderIndex + 1) % (orderArray.length));
        }, 1000)
        
      }
      
      // You can implement handling for swipe right here if needed
    }
    //setSwippedDirection("");
    setTouchMoveX(0);
  };

  const handleBellIconClick = async () => {
    setIsBellRinging(false);
    
    if (!isModalOpen) {
      try {
        // Fetch data here and set it to modalData
        //const response = await fetch('your_data_fetching_url');
        //const responseData = await response.json();
        //setModalData(responseData);
      } catch (error) {
        // Handle error
      }
    }
    
    setIsModalOpen(!isModalOpen);
 
  };

  const handleModalElementClick = (index) => {
    // Remove the clicked element from the data array
    const updatedDataArray = [...dataArray];
    updatedDataArray.splice(index, 1);
    setDataArray(updatedDataArray);
  };

  const orderStyle = {
    transform: `translateX(${touchMoveX}px)`,
    transition: touchMoveX === 0 ? "transform 0.3s ease-out" : "none",
  };

  return (
    <div
      className={`${styles.container} ${
       orderArray.length==0 ? styles.noBackground : ""
      }`}
    >

      <div className={`${styles.logo} ${styles.topLeft}`}>
        <img
          //className={styles.image}
          style={{width:"20%", height:"20%"}}
          src="logoTransparent.png" // Replace with your image URL
          alt="Image"
        />
    </div>
      <div className={`${styles.bellIconContainer} ${(isModalOpen || isBellRinging)? styles.modalOpen : ""}`}>
  <div
    className={isBellRinging ? styles.shakeBellAnimation : ""}
    onClick={handleBellIconClick}
  >
    {isBellRinging ? (
      <BiSolidBellRing className={styles.bellIcon} />
    ) : (
      <BiSolidBell className={styles.bellIcon} />
    )}
  </div>
</div>
      { orderArray.length!=0 && orders.length!=0  && (
        <div
        style={{
            ...orderStyle,
            backgroundColor: orderColor,
          }}
          className={`${styles.order} ${isAnimating ? ((swippedDirection=="R")?styles.animatingRight:(swippedDirection=="L")?styles.animating:styles.animatingDown) : ""}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.table}>Tisch: {orderArray[orderIndex][0].table}</div>
          <div className={styles.orderBody}>
            {orderArray[orderIndex].map((order, index) => (
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
                  <div style={{ width: "50%" }}>Menge: {order.quantity}</div>
                  <div style={{ width: "50%" }}>Größe: {order.size}</div>
                </div>
                <div style={{display: "flex"}}>
                  <div style={{ width: "50%" }}>Anmerkungen:</div>
                  <div style={{ width: "50%" }}>{order.notes}</div>
                 
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
            Beenden
          </button>
        </div>
      )}
      {orderArray.length != 0 && 
      (<div className={styles.ordersCount}>
         {orderArray.length > 0 ? `1/${orderArray.length}` : ''}
      </div>)}
      {orderArray.length == 0 && (
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
            Auf Bestellungen warten
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
      {isModalOpen && (
  <div className={`${styles.modal} ${isModalOpen ? styles.fadeIn : styles.fadeOut}`}>
  
    <div className={styles.modalHeader}>
    Tische, die gerufen haben:
    </div>
    <div className={styles.modalBody}>
      {dataArray.map((item, index) => (
        <div
          key={index}
          className={styles.modalElement}
          onClick={() => handleModalElementClick(index)}
        >
          {item.text}
        </div>
      ))}
    </div>
  
</div>
)}
    </div>
  );
}

export default OrdersPage;