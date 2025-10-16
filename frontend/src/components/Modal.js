// src/components/Modal.js
import { useEffect } from 'react';
import Image from 'next/image';
import styles from "../styles/Modal.module.css";

const Modal = ({ isOpen, onClose, photo, onNext, onPrev }) => {
  // Gestion de la navigation au clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Fermer la modale"
      >
        ×
      </button>

      <button 
        className={`${styles.navButton} ${styles.left}`} 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Image précédente"
      >
        ‹
      </button>
      <button 
        className={`${styles.navButton} ${styles.right}`} 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Image suivante"
      >
        ›
      </button>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Image 
          src={photo} 
          alt="Photo en grand" 
          className={styles.modalPhoto} 
          width={1200}
          height={800}
          style={{ objectFit: 'contain' }}
          unoptimized
        />
      </div>
    </div>
  );
};

export default Modal;
