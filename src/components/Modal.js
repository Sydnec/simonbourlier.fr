// src/components/Modal.js
import styles from '../styles/Modal.module.css';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, photo }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <Image src={photo} alt="Photo en grand" className={styles.modalPhoto} />
      </div>
    </div>
  );
};

export default Modal;
