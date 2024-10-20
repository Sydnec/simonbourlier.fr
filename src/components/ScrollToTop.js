// src/components/ScrollToTop.js
import { useEffect, useState } from 'react';
import styles from '../styles/ScrollToTop.module.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}>
      <button onClick={scrollToTop} className={styles.scrollButton}>
        ↑
      </button>
    </div>
  );
};

export default ScrollToTop;
