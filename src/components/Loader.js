// src/components/Loader.js
import { useEffect, useState } from 'react';
import styles from '../styles/Loader.module.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simule un chargement de 1.5 secondes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.loader} ${!loading ? styles.slideOut : ''}`}>
      <div className={styles.content}>
        <h1>Simon Bourlier</h1>
        <p>Photographe sportif</p>
      </div>
    </div>
  );
};

export default Loader;
