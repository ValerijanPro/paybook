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

    

    useEffect(()=>{
        orders.push({"slika":"background.jpg", "naziv":"Prva pljeskavica", "sastojci": "sastojci", "cena":105, "kolicina":551, "velicina":"500g", "sto":15 })
        setFirstOrder(orders.at(0));
        const newOrders = orders.slice(1);
        setOrders(newOrders); 
    }, [])

    const handleButtonClick = () => {

        //take first order from the start
        

        setIsAnimating(true);
        setTimeout(() => {
            if(firstOrder.naziv == "Prva pljeskavica"){
            
                orders.pop();
                orders.push({"slika":"background.jpg", "naziv":"Druga pljeskavica", "sastojci": "sastojci", "cena":105, "kolicina":551, "velicina":"500g", "sto":15 })
                setFirstOrder(orders.at(0));
            }
            else{
                orders.pop();
                orders.push({"slika":"background.jpg", "naziv":"Prva pljeskavica", "sastojci": "sastojci", "cena":105, "kolicina":551, "velicina":"500g", "sto":15 })
                setFirstOrder(orders.at(0));
            }
            setIsAnimating(false);
            colorIndex = (colorIndex + 1) % colorCycle.length;
            setOrderColor(colorCycle[colorIndex]);
        }, 1000);

        
    }

    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: orderColor }} className={`${styles.order} ${isAnimating ? styles.animating : ""}`}> 
                <div className={styles.table}>Table: {firstOrder.sto}</div>
                <div className={styles.orderBody}>
                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>

                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderProduct}>
                        <div style={{ fontSize:'30px',width:'100%', paddingBottom:'10px' }}>Pizza capricosa</div>
                        <div style={{ display:'flex' }}>
                            <div style={{ width:'50%' }}>
                                Quantity: 2
                            </div>
                            <div style={{ width:'50%' }}>
                                Size: 32cm
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.break}></div>
                <button style={{ position:'absolute', bottom:'70px', width: '300px' }} onClick={handleButtonClick} type="button">Finish</button>
            </div>

           
        </div>
    );
    

}

export default OrdersPage;