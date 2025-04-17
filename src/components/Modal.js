// src/components/Modal.js
import styles from "../styles/Modal.module.css";

const Modal = ({ isOpen, onClose, photo, onNext, onPrev }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>×</button>

      <button className={`${styles.navButton} ${styles.left}`} onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        ‹
      </button>
      <button className={`${styles.navButton} ${styles.right}`} onClick={(e) => { e.stopPropagation(); onNext(); }}>
        ›
      </button>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={photo} alt="Photo en grand" className={styles.modalPhoto} />
      </div>
    </div>
  );
};

export default Modal;
