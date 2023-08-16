import React, { useState } from 'react';
import styles from '../styles/Valerijan.module.css';

const ValerijanPage = () => {
  const [cards, setCards] = useState([
    'Card 1',
    'Card 2'
    // ...add more cards
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstColor, setFirstColor] = useState('blue');
  const [secondColor, setSecondColor] = useState('green');

  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    if(firstColor=='blue'){
        setFirstColor('green');
        setSecondColor('blue');
    }
    else{
        setFirstColor('blue');
        setSecondColor('green');
    }
  };

  return (
    <div className={styles.cardStack}>
      <div
        className={`${styles.card} ${styles.active}`}
        onClick={handleClick}
        style={{ boxShadow: `${firstColor} 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, ${secondColor} 10px -10px` }}
      >
        {cards[currentIndex]}
      </div>
    </div>
  );
};

export default ValerijanPage;
