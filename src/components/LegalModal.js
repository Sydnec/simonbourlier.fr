// src/components/LegalModal.js
import { useState } from "react";
import styles from "../styles/LegalModal.module.css";

export default function LegalModal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.modalContent}>{children}</div>
    </div>
  );
}
