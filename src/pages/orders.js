import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Orders.module.css";

const colorCycle = ['var(--secondary-color)', '#F5F5DCee'];
let colorIndex = 0;
function OrdersPage(){

    const [orders, setOrders] = useState([]);
    const [firstOrder, setFirstOrder] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [orderColor, setOrderColor] = useState(colorCycle[colorIndex]);


    const [restaurant, setRestaurant] = useState({});
    const [showWaitingScreen, setShowWaitingScreen] = useState(true);

    useEffect(()=>{

        setRestaurant(JSON.parse(sessionStorage.getItem("restaurant")));

    }, [])

    useEffect(() => {
        // Call tryGetOrders immediately
        if (showWaitingScreen) {
            tryGetOrders().then(() => {
                
            });
        }
    
        // Call tryGetOrders every 5 seconds
        const intervalId = setInterval(() => {
            console.log("5s "+showWaitingScreen)
            if (showWaitingScreen) {
                tryGetOrders().then(() => {
                    
                });
            }
        }, 2000); // 5000 milliseconds = 5 seconds
        
        return () => {
           // clearInterval(intervalId);
        };
    }, [restaurant]);

    useEffect(()=>{

    }, [orders])

    const tryGetOrders = async () => {
        try {
            const response = await fetch('https://arliving.herokuapp.com/arliving/pb_get_order_by_restaurant', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              
              body: JSON.stringify({
                restaurant_id: restaurant.id,
              }),
              
            });

            if (response.error) {
              throw new Error('Request failed');
            }
      
            const responseData = await response.json();
            //console.log("Try get orders");
            if(responseData.message && responseData.message == "No orders found for this restaurant"){
                console.log("show waiting screen = true");
                setShowWaitingScreen(true);
                return;
            }
            let tmpArray = responseData.order;
            let tmp = [];

            for(let x of tmpArray){
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
    }

    const handleButtonClick = () => {
        
        //clear current orders
        let x = orders.length;
        while(x>0){
            x = x-1;
            orders.pop();
        }

        tryGetOrders().then(() => {
            
        });
        
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            colorIndex = (colorIndex + 1) % colorCycle.length;
            setOrderColor(colorCycle[colorIndex]);
        }, 1000);

        
    }

    return (
        <div className={`${styles.container} ${showWaitingScreen ? styles.noBackground : ""}`}>
            {!showWaitingScreen && <div style={{ backgroundColor: orderColor }} className={`${styles.order} ${isAnimating ? styles.animating : ""}`}> 
                 <div className={styles.table}>Table: {firstOrder.table}</div>
                 <div className={styles.orderBody}>
                {orders.map((order, index) => (
                    <div className={styles.orderProduct} key={index}>
                    <div style={{ fontSize: '30px', width: '100%', paddingBottom: '10px' }}>
                        {order.name}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%' }}>Quantity: {order.quantity}</div>
                        <div style={{ width: '50%' }}>Size: {order.size}</div>
                    </div>
                    </div>
                ))}
                </div>
                 <div className={styles.break}></div>
                 <button style={{ position:'absolute', bottom:'70px', width: '300px' }} onClick={handleButtonClick} type="button">Finish</button>
                
            </div>}
            {showWaitingScreen &&  
            <div className={styles.noOrdersBody}>
                    <div style={{  display:' flex', justifyContent:'center', alignItems:'center', paddingTop:'30px', paddingBottom:'50px' }}>
                        <img  style={{ width:'250px'}} src={restaurant.image} alt="Background"/>
                    </div>
                    <div style={{ paddingTop:'100px', fontFamily: "Tahoma", fontSize:'40px', display:'flex', justifyContent:'center', alignItems:'center' }}>
                       Waiting for orders
                    </div>
                    <div style={{  display:' flex', justifyContent:'center', alignItems:'center', paddingTop:'170px', paddingBottom:'50px' }}>
                    <img  style={{ width:'250px'}}src="relaxing2.png" alt="Background"/>
                    </div>
            </div>}

           
        </div>
    );
    

}

export default OrdersPage;