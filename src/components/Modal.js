// src/components/Modal.js
import styles from "../styles/Modal.module.css";

const Modal = ({ isOpen, onClose, photo }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
       <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={photo} alt="Photo en grand" className={styles.modalPhoto} />
      </div>
    </div>
  );
};

export default Modal;
