import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Orders.module.css";

function OrdersPage(){

    const [orders, setOrders] = useState([]);
    const [firstOrder, setFirstOrder] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);

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
        }, 1000);

        
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.order} ${isAnimating ? styles.animating : ""}`}>
                <div className={styles.orderSection}>
                    <div className={styles.centeredText} style={{ marginRight: '2rem', wordWrap: 'break-word' }}>{firstOrder.naziv}</div>
                </div>
    
                <div className={styles.orderSection}>
                    <span className={styles.centeredText}> Quantity: </span>
                    <div className={styles.centeredText} style={{ marginLeft: '1rem' }}>{firstOrder.kolicina}</div>
                </div>
    
                <div className={styles.orderSection}>Size: {firstOrder.velicina}</div>
                <div className={styles.orderSection}>
                    <div style={{ width: '50%' }} className={styles.centeredText}>Cost: {firstOrder.cena}</div>
                    <div style={{ width: '50%' }} className={styles.centeredText}>Table: {firstOrder.sto}</div>
                </div>
                <div className={styles.break}></div>
                <button onClick={handleButtonClick} type="button">Finish</button>
            </div>

           
        </div>
    );
    

}

export default OrdersPage;