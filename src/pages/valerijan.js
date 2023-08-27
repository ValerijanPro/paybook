import React, { useState } from 'react';
import styles from '../styles/Valerijan.module.css';

const ValerijanPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [squarePosition, setSquarePosition] = useState({ left: 0, top: 0 });

  const handleSquareDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide default drag image
  };

  const handleSquareDrag = (e) => {
    if (isDragging) {
      const newLeft = e.clientX;
      const newTop = e.clientY;
      setSquarePosition({
        left: `${newLeft}px`,
        top: `${newTop}px`,
      });
    }
  };

  const handleSquareDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`${styles.draggableSquare} ${isDragging ? styles.grabbing : ''}`}
      style={{
        left: squarePosition.left,
        top: squarePosition.top,
      }}
      draggable
      onDragStart={handleSquareDragStart}
      onDrag={handleSquareDrag}
      onDragEnd={handleSquareDragEnd}
    />
  );
};

export default ValerijanPage;