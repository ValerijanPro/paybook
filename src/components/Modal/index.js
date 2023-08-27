const Modal = () => (
    <div
      className={`${styles.modal} ${isModalOpen ? styles.fadeIn : styles.fadeOut}`}
    >
      <div className={styles.modalContent}>
        {modalData.map((item, index) => (
          <div
            key={index}
            className={styles.modalItem}
            onClick={() => handleModalItemClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );