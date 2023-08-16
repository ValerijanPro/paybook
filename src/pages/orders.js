import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Orders.module.css";

function OrdersPage(){

    const [orders, setOrders] = useState([]);
    const [firstOrder, setFirstOrder] = useState({});
    useEffect(()=>{
        orders.push({"slika":"background.jpg", "naziv":"Gurmanska pljeskavica", "sastojci": "sastojci", "cena":105, "kolicina":1, "velicina":"500g", "sto":15 })
        setFirstOrder(orders.at(0));
        const newOrders = orders.slice(1);
        setOrders(newOrders); 
    }, [])

    const handleButtonClick = () => {
        //take first order from the start

        //check if there are none, to show the no orders message
    }

    return (
        <div className={styles.container}>
            <div className={styles.order}>
                <div style={{ display:'flex', fontSize:'40px' }}>
                    <div style={{ marginRight:'1rem', wordWrap: 'break-word', maxWidth:'70%' }}>{firstOrder.naziv}</div>
                    <span style={{ alignItems:'center', justifyContent:'center' }} > x </span>
                    <div style={{ marginLeft:'1rem' }}>{firstOrder.kolicina}</div>
                </div>
                
                <div>{firstOrder.velicina}</div>
                <div style={{ display:'flex' }}>
                    <div>{firstOrder.cena}</div>
                    <div>{firstOrder.sto}</div>
                </div>
                <button  type="button">Finish</button>
            </div>
            
        </div>
    );

}

export default OrdersPage;